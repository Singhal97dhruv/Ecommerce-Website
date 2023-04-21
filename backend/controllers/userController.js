const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User=require("../models/userModels");
const sentToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail.js")
const crypto=require("crypto")
const cloudinary=require("cloudinary")
//Register a User
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width: 150,
        crop: "scale"

    })

    const{name,email,password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    // const token=user.getJWTToken()

    // res.status(201).json({
    //     success:true,
    //     token
    // })
    sentToken(user,201,res);
})

//Login User
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    //Checking if user has given password and email both

    if(!email||!password){
        return next(new ErrorHandler("Please Enter email and password",404))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPassWordMatched=await user.comparePassword(password);

    if(!isPassWordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    // const token=user.getJWTToken()

    // res.status(200).json({
    //     success:true,
    //     token
    // })
    sentToken(user,200,res);
})

//Logout User
exports.logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        message:"logged out successfully!"
    })

    res.status(200).json({
        success:true,
        message:"Logged out Successfully!!"
    })

})

//Forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not exists",404));
    }
    //Get reset Password token
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message=`Your password resset token is :- \n\n ${resetToken} \n\n If you have not requested this email then please ignore it.`

    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce password Recovery`,
            message,
        })
        res.status(200).json({
            success:true,
            message:   `Email sent to ${user.email} successfully!!!`
        })

    }catch(error){
        user.resetPasswordExpire=undefined;
        user.resetPasswordToken=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }

})

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    });
    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or has been expired"))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));

    }
    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;

    await user.save();
    sendToken(user,200,res);

});

//Get user details
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user,
    });

})
//Update user password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPassWordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPassWordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password not matched",400))
    }
    user.password=req.body.newPassword
    await user.save();
    sentToken(user,200,res);

})
//Update user Profile
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    
    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);

        const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width: 150,
            crop: "scale"
    
        })

        newUserData.avatar={
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }

        
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
   res.status(200).json({
    success:true,
   })

})

//Get all users (admin)
exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
})
//Get single user (admin)
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not exists with id: ${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user
    })
})
//Update user Role --Admin
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
   res.status(200).json({
    success:true,
   })

})
//Delete user -- Admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{

    

    const user=await User.findById(req.params.id)


    
    
    
    if(!user){
        return next(new ErrorHandler(`User does not exists with id ${req.params.id}`));
    }
    const imageId=user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

   res.status(200).json({
    success:true,
    message:"User deleted successfully!!"
   })

})


