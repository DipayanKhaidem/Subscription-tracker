import aj from '../config/arcjet.js'
const arcjetMiddlware=async(req,res,next)=>{
    try{
        const decision= await aj.protect(req,{requested:1}); //protect this request and make ur decision(should it be denied or should we let it through)
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:'Rate Limit Exceeded'});
            }
            if(decision.reason.isBot()){
                return res.status(403).json({message:'Bot Detected'});
            }

            return res.status(403).json({message:'Access Denied'});

        }
        next();

    }catch(error){
        console.log(`Arcjet middleware error:${error}`);
        next(error);
    }
}

export default arcjetMiddlware;