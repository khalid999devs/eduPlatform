const {
  courses,
  reviews,
  clientcourses,
  Admin,
  resources,
  recordedclasses,
  sequelize,
} = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  CustomAPIError,
} = require('../errors');
const deleteFile = require('../utils/deleteFile');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const uploadCourse = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.path;
    }
    const isAlreadyExist = await courses.findOne({
      where: { title: data.title },
    });
    if (isAlreadyExist) {
      if (req.file) deleteFile(req.file.path);
      throw new UnauthorizedError(
        `${data.title} was created previously. Cannot create duplicate course!`
      );
    }
    const dbData = {
      ...data,
      estimatedPrice: parseInt(data.estimatedPrice),
      durationMonth: parseInt(data.durationMonth),
      ratings: 5,
      purchased: 0,
      feeInterval:
        data.feeInterval === 'monthly' || data.feeInterval === 'full'
          ? data.feeInterval
          : 'monthly',
      instructor: data.instructor || '{}',
      classInfo: data.classInfo || '{}',
    };
    const course = await courses.create(dbData);
    course.instructor = JSON.parse(course.instructor);
    course.classInfo = JSON.parse(course.classInfo);
    res.status(201).json({
      succeed: true,
      course,
    });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    throw new CustomAPIError(error.message);
  }
};

const updateCourseImage = async (req, res) => {
  const { courseId } = req.body;
  if (!req.file) {
    throw new BadRequestError('Image file must be provided');
  }
  const course = await courses.findOne({ where: { id: parseInt(courseId) } });
  if (!course) {
    throw new BadRequestError('Wrong course id provided');
  }
  deleteFile(course.image);
  course.image = req.file.path;
  await course.save();

  res.status(200).json({
    succeed: true,
    msg: 'Successfully updated the course Image',
    course,
  });
};

const editCourseContents = async (req, res) => {
  const data = req.body;
  const courseId = req.params.id;

  const course = await courses.findOne({ where: { id: courseId } });
  if (!course) {
    throw new NotFoundError('Could not find course. Wrong Id Provided');
  }
  if (data.instructor) {
    data.instructor = JSON.stringify(data.instructor);
  }
  if (data.classInfo) {
    data.classInfo = JSON.stringify(data.classInfo);
  }
  await course.update({
    ...data,
  });

  res.json({
    succeed: true,
    course,
    msg: 'Successfully updated',
  });
};

//without purchasing
const getPubSingleCourse = async (req, res) => {
  const courseId = req.params.id;
  const course = await courses.findByPk(courseId, {
    attributes: { exclude: ['classInfo'] },
    include: { model: reviews },
  });
  if (!course) {
    throw new NotFoundError('Could not find course. Wrong Id Provided');
  }
  course.instructor = JSON.parse(course.instructor);
  const result = course.dataValues;
  result.reviews = result.reviews.map((review) => {
    return { ...review.dataValues, user: JSON.parse(review.dataValues.user) };
  });

  res.status(200).json({
    succeed: true,
    msg: 'Course found',
    course: result,
  });
};

const getPubAllCourses = async (req, res) => {
  const { mode } = req.query;
  let allCourses;
  if (!(mode === 'short')) {
    allCourses = await courses.findAll({
      attributes: { exclude: ['classInfo'] },
    });
    if (allCourses.length > 0) {
      allCourses.forEach((course) => {
        course.instructor = JSON.parse(course.instructor);
      });
    }
  } else {
    allCourses = await courses.findAll({
      attributes: ['id', 'title'],
    });
    // console.log(mode);
  }

  res.status(200).json({
    succeed: true,
    msg: 'All courses found',
    courses: allCourses,
  });
};

//only for valid user (will do after completing the order controllers )
const getCourseByUser = async (req, res) => {
  const userId = req.user?.id;
  const adminId = req.admin?.id;
  const courseId = req.params.id;

  if (adminId) {
    const admin = await Admin.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new UnauthorizedError(
        'You do not have permission to access the data!'
      );
    }
  } else if (!adminId && userId) {
    let isClientHasCourse = await clientcourses.findOne({
      where: { [Op.and]: [{ courseId: courseId }, { clientId: userId }] },
    });
    if (!isClientHasCourse) {
      throw new UnauthorizedError(
        'You do not have permission to access this course!'
      );
    }
  }

  let course;
  course = await courses.findOne({
    where: { id: courseId },
    // attributes: { exclude: ['classInfo'] },
  });
  if (adminId || userId) {
    course = await courses.findOne({
      where: { id: courseId },
      include: [
        {
          model: resources,
        },
        {
          model: recordedclasses,
        },
      ],
    });

    if (!course) {
      throw new NotFoundError('No course found!');
    }
    course.resources.forEach((resource) => {
      resource.filesUrl = JSON.parse(resource.filesUrl);
    });
    //for zoom webs
    // if (adminId) course.classInfo = JSON.parse(course.classInfo);
    // else if (userId) {
    //   delete course.dataValues['classInfo'];
    // }
    course.classInfo = JSON.parse(course.classInfo);
  }
  if (!course) {
    throw new NotFoundError('No course found!');
  }
  course.instructor = JSON.parse(course.instructor);

  res.json({
    succeed: true,
    msg: 'course found',
    course,
  });
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  const course = await courses.findByPk(courseId);
  if (!course) {
    throw new NotFoundError('Course could not found!');
  }
  if (course.image) {
    deleteFile(course.image);
  }

  //  futher update video using cloudinary
  // if (course.demoVideoUrl) {
  //   course.demoVideoUrl = JSON.parse(course.demoVideoUrl);
  //   const result = await cloudinary.v2.uploader.destroy(publicId);
  //   if (result.result === 'ok') {
  //     return res.json({
  //       message: 'Video deleted successfully',
  //       cloudinaryResponse: result,
  //     });
  //   } else {
  //     return res
  //       .status(500)
  //       .json({ error: 'Error deleting video', cloudinaryResponse: result });
  //   }
  // }

  await course.destroy();
  res.json({
    succeed: true,
    msg: 'Successfully deleted the course',
  });
};

const updateClassDone = async (req, res) => {
  const { courseId, nextClassId, currentClassId } = req.body;
  const clientId = req.user.id;

  let targetCourse = await clientcourses.findOne({
    where: { clientId: clientId, courseId: courseId },
  });
  if (targetCourse) {
    if (
      nextClassId &&
      (typeof nextClassId === 'string' || typeof nextClassId === 'number')
    ) {
      let lockVidStates = JSON.parse(targetCourse.redVidLockState);

      if (lockVidStates[nextClassId] == 0 || lockVidStates[nextClassId] == 1) {
        lockVidStates[nextClassId] = 0;
      }

      targetCourse.currentPlVidId = nextClassId;
      targetCourse.redVidLockState = JSON.stringify(lockVidStates);
    } else {
      targetCourse.currentPlVidId = 'next';
    }
    let doneVidStates = JSON.parse(targetCourse.recVidDoneState);

    if (
      doneVidStates[currentClassId] == 0 ||
      doneVidStates[currentClassId] == 1
    ) {
      doneVidStates[currentClassId] = 1;
    }
    targetCourse.recVidDoneState = JSON.stringify(doneVidStates);
  }

  // console.log(targetCourse);

  await targetCourse.save();

  res.json({
    succeed: true,
    msg: 'Successfully updated the class!',
  });
};

const updateClassCurrTime = async (req, res) => {
  const { classId, courseId, currentTime } = req.body;
  const clientId = req.user.id;

  const query = `
  UPDATE clientcourses 
  SET recVidPlTimeState = JSON_SET(recVidPlTimeState,CONCAT('$.',:recordId),:currTime)
  WHERE courseId = :courseId AND clientId = :userId;
`;

  await sequelize.query(query, {
    replacements: {
      recordId: classId,
      courseId: courseId,
      currTime: currentTime,
      userId: clientId,
    },
  });

  res.json({
    succeed: true,
    msg: 'Successfully updated current time state!',
    currentTime: currentTime,
  });
};

const getClassCurrTime = async (req, res) => {
  const { courseId, classId } = req.body;
  const clientId = req.user.id;
  let targetCourse = await clientcourses.findOne({
    where: { clientId: clientId, courseId: courseId },
  });
  if (!targetCourse) {
    throw new NotFoundError('This specifiq class info could not be found!');
  }

  let currentTimeStateObj = JSON.parse(targetCourse.recVidPlTimeState);
  const currentClassTime = Number(currentTimeStateObj[classId]);
  if (!currentClassTime) {
    throw new NotFoundError(
      'Could not found current class time data! Something is wrong.'
    );
  }

  res.json({
    succeed: true,
    msg: 'Successfully fetched current Class time data!',
    currentTime: currentClassTime,
  });
};

const addRecordedClass = async (req, res) => {
  const courseId = req.params.id;
  const {
    videoURL,
    videoTitle,
    videoLength,
    desc,
    prevClassId,
    folder,
    classUnlockDefault = null,
  } = req.body;
  if (!videoURL) {
    throw new BadRequestError('Video URL must be provided');
  }
  const course = await courses.findOne({ where: { id: courseId } });
  if (!course) {
    throw new NotFoundError('Course could not found!');
  }
  const classData = {
    videoURL,
    videoTitle,
    videoLength: Number(videoLength),
    desc,
    courseId: Number(courseId),
  };
  if (folder) classData.folder = folder;
  const record = await recordedclasses.create(classData);

  let query;
  if (classUnlockDefault) {
    query = `
  UPDATE clientcourses 
  SET redVidLockState = JSON_SET(redVidLockState, CONCAT('$.', :recordId),0),
  recVidDoneState = JSON_SET(recVidDoneState,CONCAT('$.',:recordId),0),
  recVidPlTimeState = JSON_SET(recVidPlTimeState,CONCAT('$.',:recordId),10),
  currentPlVidId = CASE 
    WHEN currentPlVidId = 'next' THEN :recordId 
    ELSE currentPlVidId 
  END
  WHERE courseId = :courseId;
`;
  } else {
    query = `
  UPDATE clientcourses 
  SET redVidLockState = JSON_SET(
    redVidLockState, 
    CONCAT('$.', :recordId), 
    CASE 
      WHEN :prevClassId IS NULL OR :prevClassId = 'next' THEN 0
      WHEN JSON_UNQUOTE(JSON_EXTRACT(redVidLockState, CONCAT('$.', :prevClassId))) = '0' AND JSON_UNQUOTE(JSON_EXTRACT(recVidDoneState, CONCAT('$.', :prevClassId))) = '1' THEN 0 
      ELSE 1 
    END
  ),
  recVidDoneState = JSON_SET(recVidDoneState,CONCAT('$.',:recordId),0),
  recVidPlTimeState = JSON_SET(recVidPlTimeState,CONCAT('$.',:recordId),10),
  currentPlVidId = CASE 
    WHEN currentPlVidId = 'next' THEN :recordId 
    ELSE currentPlVidId 
  END
  WHERE courseId = :courseId;
`;
  }

  await sequelize.query(query, {
    replacements: {
      recordId: record.id,
      prevClassId: prevClassId || null, // Handle null/undefined values
      courseId: courseId,
    },
  });

  res.status(201).json({
    succeed: true,
    msg: 'Successfully added the record.',
    record,
  });
};

const editRecordedClass = async (req, res) => {
  const recordId = req.params.id;
  const data = req.body;
  let record = await recordedclasses.findOne({ where: { id: recordId } });
  if (!record) {
    throw new NotFoundError('The specific recorded class could not found!');
  }
  record.set(data);
  await record.save();

  res.json({
    succeed: true,
    msg: 'Successfully updated the record',
    record,
  });
};

const deleteRecordedClass = async (req, res) => {
  const recordId = req.params.id;
  const { nextClassId, courseId } = req.query;
  let record = await recordedclasses.findOne({ where: { id: recordId } });
  if (!record) {
    throw new NotFoundError('The specific recorded class could not found!');
  }
  let query = '';
  if (nextClassId) {
    query = `UPDATE clientcourses 
  SET redVidLockState = JSON_SET(redVidLockState, 
    CONCAT('$.', :nextId), 
    CASE 
      WHEN :nextId IS NOT NULL AND JSON_UNQUOTE(JSON_EXTRACT(redVidLockState, CONCAT('$.', :recordId))) = '0' THEN 0 
      ELSE JSON_UNQUOTE(JSON_EXTRACT(redVidLockState, CONCAT('$.', :nextId))) 
    END
  ),
  currentPlVidId = CASE 
    WHEN currentPlVidId = :recordId AND currentPlVidId <> 'next' THEN :nextId
    WHEN currentPlVidId <> 'next' AND :nextId IS NULL THEN 'next'
    ELSE currentPlVidId
  END
  WHERE courseId = :courseId;
`;
  } else {
    query = `UPDATE clientcourses 
  SET currentPlVidId = CASE 
    WHEN currentPlVidId = :recordId AND currentPlVidId <> 'next' THEN :nextId
    WHEN currentPlVidId <> 'next' AND :nextId IS NULL THEN 'next'
    ELSE currentPlVidId
  END
  WHERE courseId = :courseId;
`;
  }

  await sequelize.query(query, {
    replacements: {
      recordId: record.id,
      courseId: courseId,
      nextId: nextClassId || null, // This will pass null if nextClassId is not set
    },
  });

  await record.destroy();
  res.json({
    succeed: true,
    msg: 'Successfully deleted the Recorded Class',
  });
};

const addResource = async (req, res) => {
  let data = req.body;
  const courseId = req.params.id;

  if (req.files?.length > 0) {
    const filesArr = [];
    req.files.forEach((file, key) => {
      const filePropName =
        data.Title.split(' ').join('').slice(0, 10) +
        Math.ceil(Math.random() * 100);
      filesArr.push({
        id: filePropName,
        url: file.path,
      });
    });
    data.filesUrl = JSON.stringify(filesArr);
  }
  const resource = await resources.create({ ...data, courseId: courseId });
  resource.filesUrl = JSON.parse(resource.filesUrl);
  resource.driveLink = JSON.parse(resource.driveLink);

  res.status(201).json({
    succeed: true,
    msg: 'Successfully added the resource',
    resource,
  });
};

const deleteResource = async (req, res) => {
  const resourceId = req.params.id;
  const resource = await resources.findByPk(resourceId);
  if (!resource) {
    throw new BadRequestError('This particular resource could not found!');
  }
  const files = JSON.parse(resource.filesUrl);
  if (Object.keys(files).length > 0) {
    Object.keys(files).forEach((prop) => {
      deleteFile(files[prop]?.url);
    });
  }
  await resource.destroy();

  res.json({
    succeed: true,
    msg: 'Successfully deleted the resource',
  });
};

const editClassInfo = async (req, res) => {
  const { courseId, classInfo } = req.body;
  const classData = {
    zoomId: classInfo.zoomId,
    zoomPass: classInfo.zoomPass,
    zoomLink: classInfo.zoomLink,
  };
  await courses.update(
    {
      classInfo: JSON.stringify(classData),
    },
    { where: { id: courseId } }
  );
  res.json({
    succeed: true,
    msg: 'Successfully updated',
    classInfo: classData,
  });
};

const getZoomCreds = async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const username = req.user.userName;
  const { courseId } = req.body;
  const course = await courses.findByPk(courseId);
  if (!course) {
    throw new BadRequestError('Course not found!');
  }

  if (!(req.admin?.role === 'admin')) {
    const isCourseExist = await clientcourses.findOne({
      where: { clientId: userId, courseId: courseId },
    });

    if (!isCourseExist) {
      throw new UnauthorizedError(
        "You don't have permission to access this class!"
      );
    }
  }
  const { zoomInfo } = JSON.parse(course.classInfo);

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const expHour = parseInt(process.env.ZOOM_MEETEXP_H);
  const exp = iat + 60 * 60 * expHour;

  const oPayload = {
    sdkKey: process.env.ZOOM_API_KEY,
    mn: zoomInfo.meetingNo,
    role: 0,
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_API_KEY,
    tokenExp: exp,
  };

  // const sPayload = JSON.stringify(oPayload);
  // const hashedSignature = bcrypt.hashSync(sPayload, parseInt(process.env.SALT));
  const signature = jwt.sign(oPayload, process.env.ZOOM_API_SECRET);

  res.json({
    creds: {
      signature: signature,
      sdkKey: oPayload.appKey,
      username: username,
      meetingNo: oPayload.mn,
      password: zoomInfo.pass,
    },
    succeed: true,
    msg: 'Successfully created zoom credentials',
  });
};

module.exports = {
  uploadCourse,
  updateCourseImage,
  editCourseContents,
  getPubSingleCourse,
  getPubAllCourses,
  getZoomCreds,
  getCourseByUser,
  addRecordedClass,
  editRecordedClass,
  deleteRecordedClass,
  addResource,
  deleteResource,
  deleteCourse,
  editClassInfo,
  updateClassDone,
  updateClassCurrTime,
  getClassCurrTime,
};
