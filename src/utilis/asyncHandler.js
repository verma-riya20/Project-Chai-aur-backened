//Method 1 using promise
const asyncHandler=(requesthandler)=>{
    return (res,req,next)=>{
       Promise.resolve(requesthandler(res,req,next))
       .catch((err)=>next(err));
       
    }
}

//method 2 using try catch
 /*
 const asyncHandle=(fun)=>async(res,req,next)=>{
    try {
        await fun(res,req,next)
    } catch (err) {
        res.status(err.code || 500).json({
            success:false,
            message:err.message
        })

    }
}
    */

export {asyncHandler}