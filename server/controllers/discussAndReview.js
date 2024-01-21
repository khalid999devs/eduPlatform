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
const { deleteMultipleFiles } = require('../utils/fileOps');
const { JSON } = require('sequelize');

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
      where: { clientId: req.user.id, courseId: courseId },
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
      title: 'New question created',
      message: `A new question was created in ${course.title}`,
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

  if (req.user) {
    const hasClientCourse = await clientcourses.findOne({
      where: { clientId: req.user.id },
    });
    if (!hasClientCourse) {
      if (req.files?.length > 0) {
        deleteMultipleFiles(req.files);
      }
      throw new UnauthorizedError(
        'You are not authorized to start discussion here. please Enroll first'
      );
    }
  }

  const course = await courses.findByPk(courseId);
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

  const allRplyWithDisc = await discussions.findOne({
    where: { id: discussionId, courseId: courseId },
    include: {
      model: commentreplies,
    },
  });

  if (!allRplyWithDisc) {
    if (req.files?.length > 0) {
      deleteMultipleFiles(req.files);
    }
    throw new NotFoundError(
      'The discussion was not found user this course. Please provide correct info!'
    );
  }

  const newReply = {
    user: user,
    reply,
    filesUrl: JSON.stringify(filesUrl),
    discussionId: Number(discussionId),
  };

  const createdReply = await commentreplies.create(newReply);

  allRplyWithDisc.commentreplies.push(createdReply);

  const result = allRplyWithDisc.dataValues;
  result.commentreplies = result.commentreplies.map((cmtRply) => {
    return {
      ...cmtRply.dataValues,
      user: JSON.parse(cmtRply.dataValues.user),
      filesUrl: JSON.parse(cmtRply.dataValues.filesUrl),
    };
  });

  result.user = JSON.parse(result.user);
  result.filesUrl = JSON.parse(result.filesUrl);

  if (
    result.user.id === req.user?.id ||
    (result.user.id === req.admin?.id && result.user.role === req.admin?.role)
  ) {
    await notifications.create({
      clientId: req.user?.id,
      title: 'New Question Reply added',
      message: `You have a new question reply in ${course?.title}`,
    });
  } else {
    const targetUser = result.user;
    await notifications.create({
      clientId: targetUser.id,
      title: 'New question reply received',
      message: `${
        req.user ? req.user.ullName : 'An admin'
      } replied to your discussion in ${course?.title}`,
    });
    mailer(
      {
        info: {
          subject: '',
          body: '',
          discussionTitle: result.question,
          courseTitle: course.title,
          senderName: req.user ? req.user.fullName : 'Admin',
        },
        client: {
          fullName: targetUser.fullName,
          email: targetUser.email,
        },
      },
      'questionReply'
    ).catch((err) => {
      console.log(err);
    });
  }

  res.status(201).json({
    succeed: true,
    msg: 'Question reply added successfully',
    discussion: result,
  });
};

const editDiscussion = async (req, res) => {
  console.log('Discussion edited');
  res.json({
    succeed: true,
    msg: 'Discussion edited. Future upgrade feature!',
  });
};

const deleteDiscussion = async (req, res) => {
  console.log('Discussion deleted');
  res.json({
    succeed: true,
    msg: 'Discussion deleted. Future upgrade feature!',
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
        'You are not authorized to review here. please Enroll first'
      );
    }
  }
  const course = await courses.findByPk(courseId);
  if (!course) {
    throw new NotFoundError('Course not found!');
  }

  let allPreviousRevs = await await reviews.findAll({
    where: { courseId: Number(courseId) },
    include: { model: reviewreplies },
  });

  const newReview = {
    rating: Number(rating),
    comment,
    user: user,
    courseId: courseId,
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

  allPreviousRevs = allPreviousRevs.map((review) => {
    review.dataValues.reviewreplies = review.reviewreplies?.map((reply) => {
      return { ...reply, user: JSON.parse(reply.user) };
    });
    return { ...review.dataValues, user: JSON.parse(review.dataValues.user) };
  });

  res.status(201).json({
    succeed: true,
    course,
    allReviews: allPreviousRevs,
  });
};

const addReplyToReview = async (req, res) => {
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

//for valid course users
const getAllValidDiscussions = async (req, res) => {
  const courseId = req.params.id;
  const user = req.user || req.admin;

  if (user.role !== 'admin') {
    const hasClientCourse = await clientcourses.findOne({
      where: { courseId, clientId: user.id },
    });
    if (!hasClientCourse) {
      throw new UnauthorizedError(
        'You are not authorized to access the discussions!'
      );
    }
  }

  const allDiscWithRply = await discussions.findAll({
    where: { courseId },
    include: { model: commentreplies },
  });

  // result.user = JSON.parse(result.user);
  // result.filesUrl = JSON.parse(result.filesUrl);

  res.json({
    succeed: true,
    msg: 'Successfully got discussions.',
    result: allDiscWithRply,
  });
};

//for valid course users
const getAllValidReviews = async (req, res) => {
  const courseId = req.params.id;
  const user = req.user || req.admin;

  if (user.role !== 'admin') {
    const hasClientCourse = await clientcourses.findOne({
      where: { courseId, clientId: user.id },
    });
    if (!hasClientCourse) {
      throw new UnauthorizedError(
        'You are not authorized to access the reviews!'
      );
    }
  }

  const allRevWithRply = await reviews.findAll({
    where: { courseId },
    include: { model: reviewreplies },
  });

  res.json({
    succeed: true,
    msg: 'Successfully got discussions.',
    result: allRevWithRply,
  });
};

module.exports = {
  startDiscussion,
  addReviewData,
  addReplyToReview,
  addReplyToDiscussion,
  editDiscussion,
  deleteDiscussion,
  getAllValidDiscussions,
  getAllValidReviews,
};
