import { Schema,model } from "mongoose";


import Wallet from "@/resources/wallet/wallet.interface";


const WalletSchema=new Schema({
    totalAmount:{
        type:Number,
       default:0
    },
    
    currency:{
        type:String,
        default:"NGN"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User" 
    },

},
{timestamps:true}
);


export default model<Wallet>("Wallet",WalletSchema)