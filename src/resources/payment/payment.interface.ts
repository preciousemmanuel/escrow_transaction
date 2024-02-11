import { Document } from "mongoose";

interface Payment extends Document{
    status:string,
    escrow:string,
    user:string,
    amount:number,

  
    
    reference?:string
    

}

export default Payment;