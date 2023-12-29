const { courses, notifications, orders, clients } = require('../models');
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

const createOrder = async (req, res) => {
  const { courseId, paymentInfo } = req.body;
  const id = req.user.id;
  const isOrderExist = await orders.findOne({
    where: { [Op.and]: [{ courseId }, { clientId: id }] },
  });
  if (isOrderExist) {
    throw new BadRequestError('You have already purchased this course');
  }

  const course = await courses.findByPk(courseId);
  if (!course) {
    throw new NotFoundError('Course not found');
  }

  const user = await clients.findByPk(req.user.id);
  if (!user) {
    throw new NotFoundError('user could not found!');
  }

  const timeMil = Date.now();
  const invoiceNo = `#${
    Math.ceil(Math.random() * 10) +
    timeMil.slice(timeMil.length - 5, timeMil.length - 1)
  }`;

  // let dueInMil = timeMil + 30 * 24 * 60 * 60 * 1000;
  // if (course.feeInterval === 'full') {
  //   dueInMil =
  //     timeMil + parseInt(course.durationMonth) * 30 * 24 * 60 * 60 * 1000;
  // }
  const orderData = {
    courseId: course.id,
    paymentInfo: paymentInfo ? JSON.stringify(paymentInfo) : '{}',
    createdDate: timeMil,
    clientId: user.id,
    invoiceNo,
  };
  const order = await orders.create(orderData);

  //sending sms and mail
  if (user.phone) {
    sendSMS(
      number,
      `You purchase for ${course.title} is successful. Your order id is: ${invoiceNo} `
    )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  mailer(
    {
      client: {
        fullName: user.fullName,
        email: user.email,
      },
      info: {
        invoiceNo,
        courseName: course.title,
        paymentInfo: paymentInfo,
      },
    },
    'order'
  ).catch((err) => {});

  res.json({
    succeed: true,
    msg: 'Successfully purchased the course. Start learning now!',
    order,
  });
};

module.exports = { createOrder };
