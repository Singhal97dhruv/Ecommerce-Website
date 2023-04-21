const ErrorHandler =require('../utils/errorhandler')

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server error";

//Wrong mongodb id error
    if(err.name==="CastError"){
        const msg=`Resource not found.Invalid: ${err.path}`;
        err=new ErrorHandler(msg,400);
    }
//Mongoose duplicate key error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }
//Wrong Jwt error
    if(err.name==="JsonWebTokenError"){
        const message=`Json Web Token is Expired,try again`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
        // error:err.stack,
        // error:err
    })
}