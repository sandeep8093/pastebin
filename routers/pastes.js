const express=require("express");
const { getPaste, getAllPastes, createPaste, editPaste, deletePaste } =require("../controllers/pastes.js");
const {verifyToken} = require('../middleware/index')
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Please add something!');
})

router.post('/add',verifyToken, createPaste);
router.get('/get/:idx', verifyToken, getPaste);
router.get('/getall', verifyToken, getAllPastes);
router.put('/edit/:idx', verifyToken, editPaste);
router.delete('/delete/:idx', verifyToken, deletePaste);

module.exports= router;