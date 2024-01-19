const {
  courses,
  notifications,
  discussions,
  reviews,
  clientcourses,
  Admin,
  reviewreplies,
  commentreplies,
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

const startDiscussion = async (req, res) => {
  let { question, courseId } = req.body;
  courseId = Number(courseId);
  const user = req.user
    ? JSON.stringify(req.user)
    : req.admin
    ? JSON.stringify(req.admin)
    : undefined;
  if (!user) {
    throw new UnauthorizedError('User could not found!');
  }

  if (req.user) {
    const hasClientCourse = await clientcourses.findOne({
      where: { clientId: req.user.id },
    });
    if (!hasClientCourse) {
      throw new UnauthorizedError(
        'You are not authorized to start discussion here. please Enroll first'
      );
    }
  }

  const course = await courses.findOne({
    where: { id: Number(courseId) },
  });
  if (!course) {
    throw new NotFoundError('Course not found');
  }

  let filesUrl = [];
  if (req.files?.length > 0) {
    filesUrl = req.files.map((file) => {
      return {
        originalname: file.originalname,
        path: file.path,
        filename: file.filename,
      };
    });
  }

  const allDiscWithRply = await discussions.findAll({
    where: { courseId: courseId },
    include: {
      model: commentreplies,
    },
  });

  const newDiscussion = {
    question,
    user: user,
    courseId,
    filesUrl: JSON.stringify(filesUrl),
  };

  const discussion = await discussions.create(newDiscussion);
  allDiscWithRply.push(discussion);

  const alldisscussions = allDiscWithRply.map((discussion) => {
    return {
      ...discussion.dataValues,
      user: JSON.parse(discussion.dataValues.user),
      filesUrl: JSON.parse(discussion.dataValues.filesUrl),
    };
  });

  //notification update
  if (req.user) {
    await notifications.create({
      clientId: req.user?.id,
      title: 'New question received',
      message: `You have a new question in ${course.title}`,
    });
  }

  res.status(201).json({
    succeed: true,
    msg: 'Successfully created a question in discussion',
    alldisscussions,
  });
};

const addReplyToDiscussion = async (req, res) => {
  let { reply, courseId, discussionId } = req.body;
  courseId = Number(courseId);
  const user = req.user
    ? JSON.stringify(req.user)
    : req.admin
    ? JSON.stringify(req.admin)
    : undefined;
  if (!user) {
    throw new UnauthorizedError('User could not found!');
  }

  const course = await courses.findOne({
    where: { id: Number(courseId) },
  });
  if (!course) {
    throw new NotFoundError('Course not found');
  }

  if (req.user) {
    const hasClientCourse = await clientcourses.findOne({
      where: { clientId: req.user.id },
    });
    if (!hasClientCourse) {
      throw new UnauthorizedError(
        'You are not authorized to start discussion here. please Enroll first'
      );
    }
  }

  let filesUrl = [];
  if (req.files?.length > 0) {
    filesUrl = req.files.map((file) => {
      return {
        originalname: file.originalname,
        path: file.path,
        filename: file.filename,
      };
    });
  }

  const allRplyWithDisc = await discussions.findOne({
    where: { id: discussionId },
    include: {
      model: commentreplies,
    },
  });
};

const addReviewData = async (req, res) => {
  const { rating, comment, courseId } = req.body;
  const user = req.user ? JSON.stringify(req.user) : undefined;
  if (!user) {
    throw new UnauthorizedError('User could not found!');
  }

  if (req.user) {
    const hasClientCourse = await clientcourses.findOne({
      where: { clientId: req.user.id },
    });
    if (!hasClientCourse) {
      throw new UnauthorizedError(
        'You are not authorized to start discussion here. please Enroll first'
      );
    }
  }
  const course = await courses.findByPk(courseId);
  if (!course) {
    throw new NotFoundError('Course not found!');
  }

  const allPreviousRevs = await reviews.findAll({
    where: { courseId: courseId },
    include: {
      model: reviewreplies,
    },
  });

  const newReview = {
    rating: Number(rating),
    comment,
    user: user,
  };

  const createdRev = await reviews.create(newReview);
  allPreviousRevs.push(createdRev);

  let sum = 0;
  allPreviousRevs.forEach((review) => {
    sum += review.rating;
  });
  course.ratings = sum / allPreviousRevs.length;
  await course.save();

  //notification update
  await notifications.create({
    clientId: req.user.id,
    title: 'New review added',
    message: `You have a new review in ${course.title}`,
    courseId: courseId,
  });

  res.status(201).json({
    succeed: true,
    course,
    allPreviousRevs,
  });
};

const addReplyToReview = async (req, res, next) => {
  const { reply, courseId, reviewId } = req.body;
  const course = await courses.findByPk(courseId);
  if (!course) {
    throw new NotFoundError('Course not found');
  }
  let review = await reviews.findOne({
    where: { id: reviewId },
    include: { model: reviewreplies },
  });

  if (!review) {
    throw new NotFoundError('Review not found');
  }
  const replyData = {
    user: JSON.stringify(req.user || req.admin),
    reply,
    reviewId,
  };

  const createdRevRply = await reviewreplies.create(replyData);
  review.reviewreplies?.push(createdRevRply);

  const result = review.dataValues;
  result.user = JSON.parse(result.user);
  result.reviewreplies = result.reviewreplies.map((reply) => {
    return { ...reply.dataValues, user: JSON.parse(reply.dataValues.user) };
  });

  res.status(200).json({
    success: true,
    result,
  });
};

module.exports = {
  startDiscussion,
  addReviewData,
  addReplyToReview,
  addReplyToDiscussion,
};
