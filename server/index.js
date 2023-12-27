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

app.use('/uploads', express.static(__dirname + '/uploads'));
//middlewares
app.use(express.json());
app.use(cookieParser('secret'));

//routers
const adminRouter = require('./routers/admin');
const contactRouter = require('./routers/contact');
const clientRouter = require('./routers/clients');
const faqRouter = require('./routers/faq');

app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);
app.use('/api/client', clientRouter);
app.use('/api/faq', faqRouter);

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
