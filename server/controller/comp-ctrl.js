const companys=require('../models/comp-model');
const propertyModel=require('../models/property-model');
const express=require('express');
const router=express.Router();
const multer = require('multer');

const storage=multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|JPEG|png|JPG|PNG|jpeg)/))
        return cb(new Error('This is a not correct format of the file'))
        cb(undefined,true)
    }
})


const addImage=router.post('/:companyId/image',storage.single('image'),async(req,res)=>{
    try{
        const {companyId}=req.params;
        const company=await companys.findById(companyId);
        console.log(req.file);
        const image=req.file.buffer ?  req.file.buffer :'';
        company.image=image;
        await company.save().then(()=>{res.status(201).json(company)})
    }
    catch(e)
    {
        res.status(404).send({error:e.message})
     
    }
    });
const getCompanys=router.get('/companys',async (req,res)=>{
    await companys.find({},(err,companies)=>{
        if(err)
        {
            return res.status(400).json({success:false,error:err})
        }
        if(!companys.length)
        {
            return res.status(404).json({success:false,error:'Company not found'})
        }
        return res.status(200).json({success:true,data:companies})
    }).catch(err=>console.log(err))
});
const newProperty=async(req,res,error,next)=>{
    try{
    const {companyId}=req.params;
    const newProp=new propertyModel(req.body);
   
    const company=await companys.findById(companyId);
    newProp.owner=company;
    console.log('new Property',newProp);
    
    
    
    await newProp.save().then(()=>{console.log('property saved')});
    company.property.push(newProp);
    console.log('company pushed');
    await company.save().then(()=>{res.status(201).json(company)});
   
}
    catch(error)
    {
            
        console.log(error);
    }
};

const createCompany=router.post('/company',(req,res)=>{
    const body=req.body
    if(!body)
    {
        return res.status(400).json({success:false,error:'you must provide a company'})
    }
    const company=new companys(body)
    if(!company)
    {
        return res.status(400).json({success:false,error:err})
    }
    company.save().then(()=>{return res.status(201).json({success:true,id:company._id,message:'Company Created'})
    }).catch(error=>{return res.status(400).json({error,message:'company not created',})
    }).catch(err=>console.log(err))
});
module.exports={

createCompany,
newProperty,
getCompanys,


addImage



}