const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const OrderSchema=new Schema({
    order_num:{
        type:String,
        required:true
    },
    cust_id:{
        type:Schema.Types.ObjectId,
        ref:'cust_details'
    }
},{
    timestamps:true,
    versionKey:false
})
const OrderModel=new mongoose.model("order_details",OrderSchema);
module.exports=OrderModel;