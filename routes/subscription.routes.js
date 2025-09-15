import {Router} from 'express';

const subscriptionRouter=Router();

subscriptionRouter.get('/',(req,res)=>{
    res.send({title:'Get all subscriptions'})
});

subscriptionRouter.get('/:id',(req,res)=>{
    res.send({title:'Get  subscription details'})
});

subscriptionRouter.post('/',(req,res)=>{
    res.send({title:'Create subscriptions'})
});

subscriptionRouter.put('/:id',(req,res)=>{
    res.send({title:'Update subscriptions'})
});


subscriptionRouter.delete('/:id',(req,res)=>{
    res.send({title:'Delete subscriptions'})
});

subscriptionRouter.get('/user/:id',(req,res)=>{
    res.send({title:'Get user subscriptions'})
});

subscriptionRouter.get('/:id/cancel',(req,res)=>{
    res.send({title:'Cancel subscription'})
});

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title:'Get all upcoming renewals'})
});





export default subscriptionRouter;