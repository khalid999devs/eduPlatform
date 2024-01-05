const router = require('express').Router();

const {
  uploadCourse,
  updateCourseImage,
  editCourseContents,
  getPubSingleCourse,
  getPubAllCourses,
  getZoomCreds,
} = require('../controllers/courses');
const adminValidate = require('../middlewares/adminTokenVerify');
const clientValidate = require('../middlewares/clientTokenVerify');
const upload = require('../middlewares/uploadFile');

router.post('/create', adminValidate, upload.single('courses'), uploadCourse);
router.put(
  '/update-image',
  adminValidate,
  upload.single('courses'),
  updateCourseImage
);
router.patch('/edit-course/:id', adminValidate, editCourseContents);

router.get('/get-pub-course/:id', getPubSingleCourse);
router.get('/get-pub-courses', getPubAllCourses);

router.post('/zoom-creds', clientValidate, getZoomCreds);

module.exports = router;
