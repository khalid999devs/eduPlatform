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
  editClassInfo,
} = require('../controllers/courses');
const {
  startDiscussion,
  addReviewData,
  addReplyToReview,
  addReplyToDiscussion,
  editDiscussion,
  deleteDiscussion,
  getAllValidDiscussions,
  getAllValidReviews,
} = require('../controllers/discussAndReview');
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
//discussions and reviews
router.get(
  '/get-valid-discussions-admin/:id',
  adminValidate,
  getAllValidDiscussions
);
router.get(
  '/get-valid-discussions-client/:id',
  clientValidate,
  getAllValidDiscussions
);
router.get('/get-valid-reviews-client/:id', clientValidate, getAllValidReviews);
router.get('/get-valid-reviews-admin/:id', adminValidate, getAllValidReviews);

// router.post('/zoom-creds', getZoomCreds);
router.post('/zoom-creds', clientValidate, getZoomCreds);
router.post('/add-recorded-class/:id', adminValidate, addRecordedClass);
router.post(
  '/add-resource/:id',
  adminValidate,
  upload.array('resources'),
  addResource
);
//discussion part
router.post(
  '/add-discussion-ques-client',
  clientValidate,
  upload.array('discussions'),
  startDiscussion
);
router.post(
  '/add-discussion-ques-admin',
  adminValidate,
  upload.array('discussions'),
  startDiscussion
);
router.post(
  '/add-discussion-reply-client',
  clientValidate,
  upload.array('discussions'),
  addReplyToDiscussion
);
router.post(
  '/add-discussion-reply-admin',
  adminValidate,
  upload.array('discussions'),
  addReplyToDiscussion
);
router.post('/edit-classinfo', adminValidate, editClassInfo);

//reviews
router.post('/add-review', clientValidate, addReviewData);
router.post('/add-review-reply-client', clientValidate, addReplyToReview);
router.post('/add-review-reply-admin', adminValidate, addReplyToReview);

router.patch('/edit-recorded-class/:id', adminValidate, editRecordedClass);
//discussion
router.put('/edit-discussion-client', clientValidate, editDiscussion);
router.put('/edit-discussion-admin', adminValidate, editDiscussion);

router.delete('/delete-recorded-class/:id', adminValidate, deleteRecordedClass);
router.delete('/delete-resource/:id', adminValidate, deleteResource);
router.delete('/delete-course/:id', adminValidate, deleteCourse);
//discussion
router.delete('/delete-discussion-client', clientValidate, deleteDiscussion);
router.delete('/delete-discussion-admin', adminValidate, deleteDiscussion);

module.exports = router;
