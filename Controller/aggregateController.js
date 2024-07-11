const CustModel=require('../Model/custModel');
const OrderModel=require('../Model/orderModel');
const getForm=(req,res)=>{
    res.render('Admin/registration',{
        title:"Add Customer"
    })
}
const postForm=async(req,res)=>{
    try{
        let emailVerify=await CustModel.findOne({email:req.body.email});
        if(!emailVerify){
            let customerAdd=new CustModel({
                customer_name:req.body.name,
                customer_email:req.body.email,
                customer_city:req.body.city,
            });
            let saveData=await customerAdd.save();
            if(saveData){
                res.redirect('/customerorder');
            }
        }
        res.send('email already exists');
    }
    catch(err){
        console.log("Error to collect data",err);
    }
}
const getOrder=async(req,res)=>{
    try{
        let allCustomer=await CustModel.find();
        if(allCustomer){
            res.render('Admin/order',{
                title:"Customer Order",
                data:allCustomer
            })
        }
    }
    catch(err){
        console.log("Error to show order page");
    }
}
const postOrder=async(req,res)=>{
    try{
        // console.log("Collected data:",req.body);
        let orderData=new OrderModel({
            order_num:req.body.odnum,
            cust_id:req.body.cid,
        });
        let saveOrder=await orderData.save();
        if(saveOrder){
            // console.log("Order Data saved successfully");
            res.redirect('/allorders');
        }
    }
    catch(err){
        console.log("Error to collect data",err);
    }
}
const viewOrder=async(req,res)=>{
        let allOrder=await OrderModel.aggregate([
            {
                $lookup:{
                    from:"cust_details",
                    localField:"cust_id",
                    foreignField:"_id",
                    as:"cust",
                },
            },
            {
                $unwind:{
                    path:"$cust",
                },
            },
            {
                $project:{
                    createdAt:0,
                    updatedAt:0,
                    "cust.createdAt":0,
                    "cust.updatedAt":0,
                },
            },
        ]);
        console.log("All Details:",allOrder);
            res.render('Admin/allOrder',{
                title:"All Details",
                info:allOrder
            })
}
const getKol=async(req,res)=>{
    try{
        let showCity=await CustModel.aggregate([
            {
                $match:{
                    customer_city:"Kolkata"
                }
            }
        ])
        console.log("All data:",showCity);
        res.render('Admin/viewCustomer',{
            title:"All Details",
            info:showCity
        })
    }
    catch(err){
        console.log("Error to search",err);
    }
}
module.exports={
    getForm,
    postForm,
    getOrder,
    postOrder,
    viewOrder,
    getKol
}