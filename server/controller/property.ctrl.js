const Property=require('../models/property-model');
const company=require('../models/comp-model');
const getProperty=async (req,res)=>{
        await Property.find({},(err,properties)=>{
            if(err)
            {
                return res.status(400).json({success:false,error:err})
            }
            if(!Property.length)
            {
                return res.status(404).json({success:false,error:'Property Not found'})
            }
            return res.status(200).json({success:true,data:properties})
        }).populate({path:'company'}).catch(err=>console.log(err));

}
module.exports={
    getProperty,
}