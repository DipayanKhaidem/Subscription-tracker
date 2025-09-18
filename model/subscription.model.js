import mongoose from "mongoose";

const subscriptionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription name is required'],
        trim:true,
        minLength:2,
        maxLength:100
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required'],
        min:[0,'Price must be greater than 0']
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP','INR'],
        default:'INR'
    },
    frequency:{
        type:String,
        enum:['Daily','Weekly','Monthly','Yearly'],
    },
    category:{
        type:String,
        enum:['Entertainment','Productivity','Education','Health','Other'],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['Active','Expired','Cancelled'],
        default:'Active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date(), //Validator function to check if the date is not in the future
            message:'Start date cannot be in the future'
        }
    },
     renewalDate:{
        type:Date,
        // required:true,
        validate:{
            validator:function(value){
                return value>this.startDate;
             }, 
            message:'Renewal date must be after start date'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
},{timestamps:true});


//Auto-calculate renewalDate based on frequency and startDate before saving(if missing)
subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        };

        this.renewalDate=new Date(this.startDate); //Initialize renewalDate with startDate
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]); //Add appropriate days based on frequency
    }

    //Auto-update the status if renewal date has passed
    if(this.renewalDate<new Date()){
        this.status='Expired';
    }

    next();
})
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;

