const router = require('express').Router();
const {
  registration,
  login,
  logout,
  getUser,
  deleteClient,
  resetPassSetToken,
  resetPassVerify,
  getAllClients,
  getClientOnId,
  profileView,
} = require('../controllers/clients');

const upload = require('../middlewares/uploadFile');
const { submit, checkRegPermit } = require('../middlewares/submitFile');
const {
  clientRegValidate,
  emailValidate,
  passwordValidate,
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

//combined
router.post('/getAll', adminValidate, getAllClients);
router.post('/login', login);

router.post('/deleteAcc', clientValidate, deleteClient);
router.get('/logout', clientValidate, logout);
//reset pass
router.post('/rPassToken', resetPassSetToken);
router.post('/rPassVerify', resetPassVerify);

//event participation----------------------------***------------------

module.exports = router;
