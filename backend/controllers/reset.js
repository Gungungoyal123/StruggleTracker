import User from "../models/usermodel.js";
import {Resend} from "resend";
import crypto from "crypto";
import bcrypt from "bcrypt";
export const reset=async(req,res)=>{
    try {
    const{email}=req.body;
         if(!email ){
            return res.status(400).json({success:false,message:"Incomplete info"});
          } 
          const user=await User.findOne({email});
          if(!user){
           return res.status(401).json({success:false,message:"User not registered"});
          }
         const otp = crypto.randomInt(100000, 999999).toString();
         const resend=new Resend(process.env.RESEND_API_KEY);
         user.otp =otp; 
         await user.save();
         await resend.emails.send({
            //standard email address from resend
           from: "onboarding@resend.dev",
           to:email,
           subject:"your anonyoumus app verfication code",
            html:`<div>
            <h2> Hello,${user.name} </h2>
            <p>your struggleTracker password reset code is: ${otp}</p>
            <p>enter this otp to change your password </p>
            </div>`,

        });
           return res.status(201).json({success:true,message:"otp send successfully"});

    } catch (error) {
         return res.status(500).json({success:false,error:error.message});
    }
}
export const verifypassword=async(req,res)=>{
    try {
        const {email,otp}=req.body;
        if(!email ){
            return res.status(400).json({success:false,message:"Incomplete info"});
          } 
          const user=await User.findOne({email});
          if(!user){
           return res.status(401).json({success:false,message:"User not registered"});
          }
          if(user.otp!=otp){
            return res.status(401).json({success:false,message:"invlaid otp"});
          }
          return res.status(200).json({success:true,message:"enter new password"});
        
    } catch (error) {
         return res.status(500).json({success:false,error:error.message}); 
    }
}
export const passwordreset=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"Incomplete info"});
          } 
          const user=await User.findOne({email});
          if(!user){
           return res.status(401).json({success:false,message:"User not registered"});
          }
           const salt=10;
           const hashpassword=await bcrypt.hash(password,salt);
           user.password=hashpassword;
           await user.save();
          return res.status(200).json({success:true,message:"password reset successfully"});
        
    } catch (error) {
         return res.status(500).json({success:false,error:error.message}); 
    }
}