const { courses, notifications } = require('../models');
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
  });
  if (!course) {
    throw new NotFoundError('Could not find course. Wrong Id Provided');
  }
  course.instructor = JSON.parse(course.instructor);

  res.status(200).json({
    succeed: true,
    msg: 'Course found',
    course,
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

//only for valid user (will do after completing the order controllers and editing the user)
const getCourseByUser = async (req, res) => {};

module.exports = {
  uploadCourse,
  updateCourseImage,
  editCourseContents,
  getPubSingleCourse,
  getPubAllCourses,
};
