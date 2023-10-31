const router = require('express').Router();
const {
  registration,
  login,
  logout,
  getUser,
  deleteClient,
  resetPassSetToken,
  resetPassVerify,
  getEventBasedCount,
  allPointOrderedCAs,
  getAllClients,
  getClientOnId,
  profileView,
} = require('../controllers/clients');
const {
  sePaticipation,
  teamParticipation,
  paidVerify,
  findTeamInfo,
  changeTransactionId,
  updateProfileInfos,
  editClientImage,
  submitFile,
  clearSubInfos,
  submitLink,
} = require('../controllers/clientEvents');

const upload = require('../middlewares/uploadFile');
const { submit, checkRegPermit } = require('../middlewares/submitFile');
const {
  caRegValidate,
  clientRegValidate,
  emailValidate,
  passwordValidate,
  caPermitValidate,
} = require('../middlewares/clientValidate');
const clientValidate = require('../middlewares/clientTokenVerify');
const adminValidate = require('../middlewares/adminTokenVerify');

//get all client data with client
router.get('/fullSingle/:username', clientValidate, getClientOnId);
router.get('/getClient', clientValidate, getUser);
router.get('/view/:username', profileView);

//participants
router.post(
  '/reg/par',
  upload.single('participants'),
  emailValidate,
  clientRegValidate,
  registration
);

//CA
router.post(
  '/reg/ca',
  caPermitValidate,
  upload.single('CA'),
  emailValidate,
  caRegValidate,
  registration
);
router.post('/ca', allPointOrderedCAs);

//combined
router.post('/getAll', adminValidate, getAllClients);
router.get('/parCount/:value', adminValidate, getEventBasedCount);
router.post('/login', login);

router.post('/deleteAcc', clientValidate, deleteClient);
router.get('/logout', clientValidate, logout);
//reset pass
router.post('/rPassToken', resetPassSetToken);
router.post('/rPassVerify', resetPassVerify);

//event participation----------------------------***------------------
router.post('/singlePart', clientValidate, sePaticipation);
router.post('/teamPart', clientValidate, teamParticipation);
router.post(
  '/clearSubInfo/:eventValue',
  clientValidate,
  checkRegPermit,
  clearSubInfos
);
router.post(
  '/submitFile/:eventValue',
  clientValidate,
  checkRegPermit,
  submit.single('submission'),
  submitFile
);
router.post(
  '/submitLinks/:eventValue',
  clientValidate,
  checkRegPermit,
  submitLink
);
//event participation----------------------------***------------------

//event Payment verification
router.post('/paidVerify/:parId', adminValidate, paidVerify);

//find teams
router.get('/findTeam/:teamName', clientValidate, findTeamInfo);

//client profile updates
router.patch(
  '/editTransaction',
  clientValidate,
  passwordValidate,
  changeTransactionId
);
router.patch(
  '/editProfile',
  clientValidate,
  passwordValidate,
  updateProfileInfos
);
router.patch(
  '/editParImg',
  upload.single('participants'),
  clientValidate,
  editClientImage
);
router.patch(
  '/editCAImg',
  upload.single('CA'),
  clientValidate,
  editClientImage
);

module.exports = router;
