import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter=Router();

subscriptionRouter.get('/',(req,res)=>{
    res.send({title:'Get all subscriptions'})
});

subscriptionRouter.get('/:id',(req,res)=>{
    res.send({title:'Get  subscription details'})
});

subscriptionRouter.post('/',authorize, //validating the request with necessary authorization procedure before creating any kind of document
    createSubscription);

subscriptionRouter.put('/:id',(req,res)=>{
    res.send({title:'Update subscriptions'})
});


subscriptionRouter.delete('/:id',(req,res)=>{
    res.send({title:'Delete subscriptions'})
});

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

subscriptionRouter.get('/:id/cancel',(req,res)=>{
    res.send({title:'Cancel subscription'})
});

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title:'Get all upcoming renewals'})
});





export default subscriptionRouter;