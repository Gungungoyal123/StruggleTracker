import User from "../models/usermodel.js";

export const getprofile=async(req,res)=>{
     try {
         const user=await User.findById(req.user.id);
         if(!user){
            return res.status(404).json({success:false});
         }
          return res.status(200).json({success:true,name:user.name});

     } catch (error) {
         return res.status(404).json({success:false,error:{reportError}});
     }
};