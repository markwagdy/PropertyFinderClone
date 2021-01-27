const express=require('express');
const PropertyCtrl=require('../controller/property.ctrl');
const Property=require('../models/property-model');
const router=express.Router();
const multer = require('multer');

const storage=multer({
    limits:{
        fileSize:100000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|JPEG|png|JPG|PNG|jpeg)/))
        return cb(new Error('This is a not correct format of the file'))
        cb(undefined,true)
    }
})

router.get('/propertys',PropertyCtrl.getProperty);
router.post('/:propertyId/images',storage.array('images',5),async(req,res)=>{
    try{
    const {propertyId}=req.params;
    const property=await Property.findById(propertyId);
    const image=req.files.buffer ? req.files.buffer :'';
    property.images.push(image);
     await property.save().then(()=>{res.status(201).json(property)});
    }
    catch(Error)
    {
        console.log(Error);
       
    }
    })
module.exports=router;