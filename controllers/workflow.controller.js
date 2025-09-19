import {createRequire} from 'module'; //de-structuring createRequire
import Subscription from '../model/subscription.model.js';
import dayjs from 'dayjs';


const require=createRequire(import.meta.url);
const {serve}=require('@upstash/workflow/express'); //de-structuring serve

const REMINDERS=[7,5,2,1];


export const sendReminders=serve(async (context)=>{
    const {subscriptionId}=context.requestPayload; //extract the subId from a specific workflow
    const subscription=await fetchSubscription(context,subscriptionId); //fetch the details of the subscription

    if(!subscription|| subscription.status !=='active') return;
    const renewalDate= dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
            console.log(`Renewal date has passed for subscription ${subscriptionId}.Stopping workflow`);
            return;
        }
    

    for(const daysBefore of REMINDERS){
        const reminderDate= renewalDate.subtract(daysBefore,'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,{label:`Reminder ${daysBefore} days before`, reminderDate});
        }
        if(dayjs().isSame(reminderDate,'day')){
        await triggerReminder(context,`Reminder ${daysBefore} days before reminder`);
        }
    }
});

const fetchSubscription=async(context,subscriptionId)=>{
    return await context.run('get Subscription',async()=>{ //starting the context for getSubscription
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}

const sleepUntilReminder=async(context,label,date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder=async(context,label)=>{
    return await context.run(label,async()=>{
        console.log(`Triggering ${label} reminder`);
        //Send email , SMS , push notification
    })
}