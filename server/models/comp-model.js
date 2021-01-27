const mongoose=require('mongoose');
require('mongoose-type-email');
const CompSchema=mongoose.Schema;
const  imgset=require('../image-setup');
const Company=new CompSchema(
    {
        compName:{type:String,required:true},   
        crNum:{type:Number,required:true},
        accType:{type:String,required:true},
        city:{type:String,required:true},
        firstName:{type:String,required:true},
        secondName:{type:String,required:true},
        jobTitle:{type:String,required:true},
        email:{type:mongoose.SchemaTypes.Email,required:true},
        phone:{type:Number,required:true},
       property:[{type:mongoose.SchemaTypes.ObjectId,ref:'property'}],
       image:{type:Buffer},
    
    }
)
module.exports=mongoose.model('company',Company);
