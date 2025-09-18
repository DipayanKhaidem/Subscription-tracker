import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";
import User from '../model/user.model.js';


//This middleware is trying to find the user based off of the token of the user
//that is trying to make the request

//It looks if its there and decodes it, verifies it  and then attaches it to the req

const authorize=async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]; 
        }
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }

        const decoded=jwt.verify(token,JWT_SECRET);
        const user=await User.findById(decoded.userId);
        if(!user) return res.status(401).json({message:"Unauthorized"});
        req.userId=decoded.userId;
        req.user=user;
        next();


    }catch(error){
        res.status(401).json({message:"Unauthorized",error:error.message});
    }
}

export default authorize;