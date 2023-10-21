const router = require('express').Router()
const {
  createQuesAns,
  editQuesAns,
  deleteQues,
  allFaqs,
} = require('../controllers/faq')
const adminValidate = require('../middlewares/adminTokenVerify')

router.get('/', allFaqs)
router.post('/', adminValidate, createQuesAns)
router.put('/:id', adminValidate, editQuesAns)
router.delete('/:id', adminValidate, deleteQues)

module.exports = router
