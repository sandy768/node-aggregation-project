const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CustomerSchema=new Schema({
    customer_name:{
        type:String,
        required:true
    },
    customer_email:{
        type:String,
        required:true
    },
    customer_city:{
        type:String,
        required:true
    }
    },{
        timestamps:true,
        versionKey:false 
})

const CustModel=new mongoose.model('cust_details',CustomerSchema);
module.exports=CustModel;