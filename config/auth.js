module.exports={
    authcheck:(req,res,next)=>{
        req.flash('error_msg','Please Logout')
        next()
    }
}