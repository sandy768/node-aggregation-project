require('dotenv').config();
const express=require('express');
const appServer=express();
const mongoose=require('mongoose');
const PORT=process.env.PORT||4600;
const aggregateRouter=require('./Router/aggregateRouter');

appServer.set('view engine','ejs');
appServer.set('views','View');

appServer.use(express.urlencoded({extended:true}));
appServer.use(aggregateRouter);
mongoose.connect(process.env.DB_URL)
.then(res=>{
    appServer.listen(PORT,()=>{
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch(err=>{
    console.log("Error to connect to database");
})