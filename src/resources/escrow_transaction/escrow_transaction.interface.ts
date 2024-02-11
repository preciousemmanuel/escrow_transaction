import { Document } from "mongoose";

interface Escrow extends Document{
    item_name:string,
    amount:number,
    created_by:string,
    isactive?:boolean,
    description?:string,
    sku?:string
    

}

export default Escrow;