const express=require('express');
const router=express.Router();
const {getForm,postForm,getOrder,postOrder,viewOrder,getKol} = require('../Controller/aggregateController');

router.get('/',getForm);
router.post('/postdata',postForm);
router.get('/customerorder',getOrder);
router.post('/postorder',postOrder);
router.get('/allorders',viewOrder);
router.get('/showkolkata',getKol);

module.exports=router;