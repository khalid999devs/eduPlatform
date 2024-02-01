const {
  courses,
  notifications,
  orders,
  clients,
  clientcourses,
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
const { Op } = require('sequelize');
const sendSMS = require('../utils/sendSMS');

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.SSLCMZ_STORE_ID;
const store_passwd = process.env.SSLCMZ_STORE_PASS;
const is_live = false; //true for live, false for sandbox

const paymentInit = async (req, res) => {
  const paymentData = req.body;
  const course = await courses.findByPk(paymentData.courseId);
  if (!course) {
    throw new NotFoundError(
      'Course not found! Please Enter valid informations! '
    );
  }
  const trans_id = `${req.user.id}${Date.now().toString().slice(-4)}${Math.ceil(
    Math.random() * 100
  )}`;

  const data = {
    total_amount: course.estimatedPrice,
    currency: paymentData.currType,
    tran_id: trans_id, // use unique tran_id for each api call
    success_url: `http://localhost:${process.env.PORT}/api/order/validate-payment/${trans_id}`,
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: paymentData.name,
    cus_email: 'customer@example.com',
    cus_add1: paymentData.address,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: paymentData.postCode,
    cus_country: 'Bangladesh',
    cus_phone: paymentData.phone,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(data)
    .then(async (apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({
        succeed: true,
        msg: 'Successfully initialized payment',
        url: GatewayPageURL,
      });

      const orderData = {
        courseId: paymentData.courseId,
        clientId: req.user.id,
        paymentInfo: JSON.stringify({
          paidStatus: false,
          ...paymentData,
          trnasactionId: trans_id,
        }),
      };
      await orders.create(orderData);
    })
    .catch((err) => {
      console.log(err);
      throw new CustomAPIError(err.message);
    });
};

const validatePayment = async (req, res) => {
  const transId = req.params.tranId;
};

const createOrder = async (req, res) => {
  const trans_Id = req.params.tranId;
  console.log(trans_Id);

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
    Math.ceil(Math.random() * 10) + timeMil.toString().slice(-4)
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
  await clientcourses.create({ courseId: course.id, clientId: user.id });
  course.purchased = course.purchased + 1;
  await course.save();

  //send notifications
  const notification = await notifications.create({
    title: 'New purchase made',
    message: `A new purchase for ${course.title} was made by ${user.userName}`,
  });

  //sending sms and mail
  if (user.phone) {
    sendSMS(
      user.phone,
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

  order.paymentInfo = JSON.parse(order.paymentInfo);
  res.json({
    succeed: true,
    msg: 'Successfully purchased the course. Start learning now!',
    order,
  });
};

const getAllOrdersAdmin = async (req, res) => {
  const result = await orders.findAll({});
  res.json({
    succeed: true,
    msg: 'Successful',
    result,
  });
};

const clientInvoices = async (req, res) => {
  const userId = req.user.id;
  const invoices = await orders.findAll({ where: { clientId: userId } });
  if (invoices.length > 0) {
    invoices.forEach((invoice) => {
      invoice.paymentInfo = JSON.parse(invoice.paymentInfo);
    });
  }
  res.json({
    succeed: true,
    msg: 'Successful',
    invoices,
  });
};

module.exports = {
  createOrder,
  getAllOrdersAdmin,
  clientInvoices,
  paymentInit,
  validatePayment,
};
