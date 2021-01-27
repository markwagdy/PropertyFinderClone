var fs=require('fs');
var path =require('path');
var multer=require('multer');
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads'),
        console.log("Entering");

    },
    filename:(req,file,cb)=>{
        cb(null,file.filename+'-'+Date.now())
    }
});
var upload=multer({storage:storage});
module.exports={
    fs,
    path,
    upload,
    multer,
    storage
}