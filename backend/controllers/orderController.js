const Order=require("../models/orderModels")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

//Create new Order
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body

    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        message:true,
        order,
    })
})

//Get single Order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }
    res.status(200).json({
        success:true,
        order,
    })
})

// Get Loggedin User Order
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders,
    })
})

// Get All Orders--- admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find();

    let totalAmount=0;
    orders.forEach(ele=>{
        totalAmount+=ele.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})
// Update Order Status--- admin
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("The order is delievered already",400));

    }
    if(req.body.status==="Shipped"){
    order.orderItems.forEach(async(ele)=>{
        await updateStock(ele.product,ele.quantity);
    })
}

    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){

        order.deliveredAt=Date.now()
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.Stock-=quantity;
    if(product.Stock<0)product.Stock=0;
    await product.save({validateBeforeSave:false});
}

// Delete Orders--- admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }


    await order.remove();
    res.status(200).json({
        success:true,
    })
})