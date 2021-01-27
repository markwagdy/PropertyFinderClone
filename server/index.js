const express=require('express');
const bodyParser=require('body-parser');
require('dotenv/config');
const cors=require('cors');
const app=express();
const apiPort=2343;
const compImage=require('./controller/comp-ctrl');
const db=require('./data/db');
const companyRouter=require('./router/comp-router'); 
const PropertyRouter=require('./router/property-router');



app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(bodyParser.json());
db.on('error',console.error.bind(console,'MongoDb connection error'));

app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.use('/apiComp',companyRouter);
app.use('/apiProp',PropertyRouter);

app.listen(apiPort,()=>console.log(`server running on port ${apiPort}`));
