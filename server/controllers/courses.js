const {
  courses,
  notifications,
  discussions,
  reviews,
  clientcourses,
  Admin,
  resources,
  recordedclasses,
} = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  CustomAPIError,
} = require('../errors');
const { redis } = require('../utils/redis');
const mailer = require('../utils/sendMail');
const deleteFile = require('../utils/deleteFile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const cloudinary = require('cloudinary');

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
  const allCourses = await courses.findAll({
    attributes: { exclude: ['classInfo'] },
  });
  if (allCourses.length > 0) {
    allCourses.forEach((course) => {
      course.instructor = JSON.parse(course.instructor);
    });
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
    attributes: { exclude: ['classInfo'] },
  });
  if (adminId) {
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

const addRecordedClass = async (req, res) => {
  const courseId = req.params.id;
  const { videoURL, videoTitle, videoLength, desc } = req.body;
  if (!videoURL) {
    throw new BadRequestError('Video URL must be provided');
  }
  const course = await courses.findOne({ where: { id: courseId } });
  if (!course) {
    throw new NotFoundError('Course could not found!');
  }
  const record = await recordedclasses.create({
    videoURL,
    videoTitle,
    videoLength: Number(videoLength),
    desc,
    courseId: Number(courseId),
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
  let record = await recordedclasses.findOne({ where: { id: recordId } });
  if (!record) {
    throw new NotFoundError('The specific recorded class could not found!');
  }
  await record.destroy();
  res.json({
    succeed: true,
    msg: 'Successfully deleted the Recorded Class',
  });
};

const addResource = async (req, res) => {
  const data = req.body;
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

const getZoomCreds = async (req, res) => {
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
    signature: signature,
    sdkKey: oPayload.appKey,
    username: username,
    meetingNo: oPayload.mn,
    password: zoomInfo.pass,
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
};
