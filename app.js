import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './Database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddlware from './middleware/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


const app=express();

app.use(express.json());//to parse json data in request body
app.use(express.urlencoded({extended:false}));//this helps to process the form data sent via html forms in simple format
app.use(cookieParser()); //reads data from incoming requests so that the app can store user data
app.use(arcjetMiddlware);

app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter);


app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT,async()=>{
    console.log(`Subscription Tracker API is running on port http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;