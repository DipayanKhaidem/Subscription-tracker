import mongoose from 'mongoose';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

//routes are the endpoints and controllers are the logic behind those routes

export const signUp=async(req,res,next)=>{
//Implement Sign up logic here
const session=await mongoose.startSession(); //This is not a user session but rather a database transaction session
session.startTransaction(); //This we do to start atomic operations(something either works completely or doesn't work at all)

try{
    //Logic to create a new user
    //What is a req body? - Data sent by the client to the server(Post request)
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        const error=new Error('User already exists');
        error.statusCode=409;
        throw error;
    }

    const salt=await bcrypt.genSalt(10); //what is salt? - random string added to the password before hashing
    const hashedPassword=await bcrypt.hash(password,salt);  //Hash password-->It means securing the password
    const newUsers=await User.create([{name,email,password:hashedPassword}],{session});
    const token=jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
        success:true,
        message:'User created successfully',
        data:{
            token,
            user:newUsers[0],
        }
    })
}catch(error){
    await session.abortTransaction(); //if anything goes wrong at any point ,we abort the transaction
    session.endSession();
    next(error);
}
}

export const signIn=async(req,res,next)=>{
    //Implement Sign in logic here
}

export const signOut=async(req,res,next)=>{
    //Implement Sign out logic here
}