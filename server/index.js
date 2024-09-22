require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const db = require('./models');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { v2: cloudinary } = require('cloudinary');
const { isFromSSLCommerz, ipnListener } = require('./controllers/orders');
const { validatePayment } = require('./controllers/orders');

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
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
// Custom CORS configuration for SSLCommerz route
const customCorsForSSLCommerz = async (req, callback) => {
  const corsOptions = {
    ...corOptions,
  };

  if (req.header('Origin') === 'null') {
    if (await isFromSSLCommerz(req)) {
      corsOptions.origin = true;
    }
  }
  callback(null, corsOptions);
};
// Custom CORS middleware for SSLCommerz route

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));

//transaction routes
app.post('/ipn', cors(customCorsForSSLCommerz), ipnListener);
app.post(
  '/api/order/validate-payment/:tranId',
  cors(customCorsForSSLCommerz),
  validatePayment
);

app.use(cors(corOptions));

app.use('/uploads', express.static(__dirname + '/uploads'));

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

app.get('/api/test', (req, res) => {
  res.json({
    succeed: true,
    msg: 'Successfully connected to the server!',
  });
});

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
