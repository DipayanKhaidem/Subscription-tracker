import mongoose from "mongoose";  

const userSchema= new mongoose.Schema({
    name:{type:String,
        required:[true,'User Name is required'],
        trim:true,
        minLength:2,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,'User email is required'],
        trim:true,
        unique:true,
        minLength:5,
        maxLength:255,
        lowercase:true,
        match:[/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,'User password is required'],
        minLength:6    }

},
{timestamps:true});

const User=mongoose.model('User',userSchema); //Creating a model named User using the userSchema

export default User;