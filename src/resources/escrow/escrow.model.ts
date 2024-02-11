import { Schema,model } from "mongoose";


import Escrow from "@/resources/escrow/escrow.interface";


const EscrowSchema=new Schema({
    item_name:{
        type:String,
       
    },
    amount:{
        type:Number,
        
    },
    description:{
        type:String,
        
    },
    sku:{
        type:String,
        
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref:"User" 
    },
    
    isactive:{
        type:Boolean
    }

},
{timestamps:true}
);


export default model<Escrow>("Escrow",EscrowSchema)