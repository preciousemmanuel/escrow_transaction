import { Document } from "mongoose";

interface Wallet extends Document{
    totalAmount?:number,
    user:any,
    currency:string,
    
    

}

export default Wallet;