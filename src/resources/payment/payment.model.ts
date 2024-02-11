import { Schema,model } from "mongoose";


import Payment from "@/resources/payment/payment.interface";


const PaymentSchema=new Schema({
    status:{
        type:String,
       
    },
    reference:{
        type:String,
       
    },
    amount:{
        type:Number,
        
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"User" 
    },

   
    escrow:{
        type:Schema.Types.ObjectId,
        ref:"Escrow" 
    },
    
  

},
{timestamps:true}
);


export default model<Payment>("Payment",PaymentSchema)