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

const paymentInit = async (req, res) => {
   const paymentInfo = req.body;

   const data = {
     store_id: process.env.SSLCOMMERZ_STORE_ID,
     store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
     total_amount: paymentInfo.total_amount,
     currency: paymentInfo.currency,
     tran_id: paymentInfo.tran_id,
     success_url: 'http://yourdomain.com/success', // Replace with your success URL
     fail_url: 'http://yourdomain.com/fail', // Replace with your failure URL
     cancel_url: 'http://yourdomain.com/cancel', // Replace with your cancel URL
     ipn_url: 'http://yourdomain.com/ipn', // Replace with your IPN (Instant Payment Notification) URL
     ...paymentInfo, // Spread the rest of the payment info
   };

   const sslcommerzUrl = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php'; // Use sandbox for testing and switch to live URL in production
   try {
     const response = await axios.post(sslcommerzUrl, data);
     res.json(response.data);
   } catch (error) {
     console.error('Error initiating payment session:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
};

const validatePayment=async(req,res)=>{
  const val_id = req.body.val_id; // Value provided by SSLCommerz in the callback
  const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}&format=json`; // Use sandbox for testing and switch to live URL in production

  try {
    const response = await axios.get(validationUrl);
    if (
      response.data.status === 'VALID' ||
      response.data.status === 'VALIDATED'
    ) {
      // Payment is valid and confirmed by SSLCommerz
      // Handle post-payment processes (e.g., update order status, send confirmation email)
      res.json({
        status: 'success',
        message: 'Payment validated successfully',
        data: response.data,
      });
    } else {
      // Payment validation failed
      res.json({
        status: 'failure',
        message: 'Payment validation failed',
        data: response.data,
      });
    }
  } catch (error) {
    console.error('Error validating payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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

module.exports = { createOrder, getAllOrdersAdmin, clientInvoices };
