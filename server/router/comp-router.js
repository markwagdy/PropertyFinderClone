const express=require('express');
const compCtrl=require('../controller/comp-ctrl');
const propertyModel=require('../models/property-model');
const companys=require('../models/comp-model');
const comprouter=express.Router();
// const comprouter=require('express-promise-router')();

// comprouter.use(compCtrl.getCompanys);
 comprouter.use(compCtrl.createCompany);
comprouter.post('/:companyId/property',async(req,res)=>{
  try{
        const {companyId}=req.params;
        console.log(companyId);
        const newProp=new propertyModel(req.body);
       
        const company=await companys.findById(companyId);
       console.log('company');
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
}
);


comprouter.use(compCtrl.addImage);

module.exports=comprouter;