require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const db = require('./models');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

//cors
const whitelist = process.env.REMOTE_CLIENT_APP.split(',');
const corOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corOptions));
// Custom CORS configuration for SSLCommerz route
const customCorsForSSLCommerz = async (req, callback) => {
  const corsOptions = {
    // By default, follow the global CORS policy
    origin: corOptions.origin,
    credentials: corOptions.credentials,
    optionsSuccessStatus: corOptions.optionsSuccessStatus,
  };

  // Add a condition specifically for requests related to SSLCommerz
  if (req.header('Origin') === 'null' && (await isFromSSLCommerz(req))) {
    // Enable CORS for this request if it's from SSLCommerz
    corsOptions.origin = true;
  }

  // Callback expects two parameters: error and options
  callback(null, corsOptions);
};

// Function to determine if the request is from SSLCommerz
const isFromSSLCommerz = async (req) => {
  const tran_id = req.params.id;
  try {
    const response = await axios.post(
      'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php',
      {
        // your payload here, including the transaction ID and possibly a secret or signature
        tran_id: transactionId,
        // ... other required data
      }
    );

    if (
      response.data.status === 'VALID' ||
      response.data.status === 'VALIDATED'
    ) {
      return true;
    }
  } catch (error) {
    console.error('Error validating transaction with SSLCommerz:', error);
  }
  return false;
};

app.use('/uploads', express.static(__dirname + '/uploads'));
//middlewares
app.use(express.json());
app.use(cookieParser('secret'));

//routers
const adminRouter = require('./routers/admin');
const contactRouter = require('./routers/contact');
const clientRouter = require('./routers/clients');
const faqRouter = require('./routers/faq');
const courseRouter = require('./routers/courses');
const orderRouter = require('./routers/orders');
const examRouter = require('./routers/exam');
const galleryRouter = require('./routers/gallery');
const notificationRouter = require('./routers/notifications');

app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);
app.use('/api/client', clientRouter);
app.use('/api/faq', faqRouter);
app.use('/api/course', courseRouter);
app.use('/api/order', orderRouter);
app.use('/api/exam', examRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/notification', notificationRouter);

//notfound and errors
const errorHandlerMiddleWare = require('./middlewares/errorHandler');
const notFoundMiddleWare = require('./middlewares/notFound');
const { redis } = require('./utils/redis');
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

//ports and start
const PORT = process.env.PORT || 8001;
db.sequelize
  .sync()
  .then((_) => {
    console.log(`database connected`);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
