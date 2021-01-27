const mongoose=require('mongoose');
const company=require('./comp-model');

const Schema=mongoose.Schema
const Property=new Schema({

    propType:{type:String,required:true},
    propSize:{type:Number,required:true},
    bedrooms:{type:String,required:true},
    bathrooms:{type:Number,required:true},
    location:{type:String,required:true},
    description:{type:String,required:true},
    
    images:{type:[Buffer]},
    company:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'company'
        }
 
},
{
    timestamps:true
},
)
module.exports=mongoose.model('property',Property);
