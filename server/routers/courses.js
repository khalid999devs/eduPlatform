const router = require('express').Router();

const {
  uploadCourse,
  updateCourseImage,
  editCourseContents,
  getPubSingleCourse,
  getPubAllCourses,
  getZoomCreds,
  getCourseByUser,
  addRecordedClass,
  editRecordedClass,
  deleteRecordedClass,
  addResource,
  deleteResource,
  deleteCourse,
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
router.get('/valid-course/:id', clientValidate, getCourseByUser);
router.get('/valid-admin-course/:id', adminValidate, getCourseByUser);

// router.post('/zoom-creds', getZoomCreds);
router.post('/zoom-creds', clientValidate, getZoomCreds);
router.post('/add-recorded-class/:id', adminValidate, addRecordedClass);
router.post(
  '/add-resource/:id',
  adminValidate,
  upload.array('resources'),
  addResource
);

router.patch('/edit-recorded-class/:id', adminValidate, editRecordedClass);

router.delete('/delete-recorded-class/:id', adminValidate, deleteRecordedClass);
router.delete('/delete-resource/:id', adminValidate, deleteResource);
router.delete('/delete-course/:id', adminValidate, deleteCourse);

module.exports = router;
