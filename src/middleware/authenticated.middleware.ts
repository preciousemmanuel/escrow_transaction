import userModel from "@/resources/user/user.model";
import HttpException from "@/utils/exceptions/http.exception";
import Token from "@/utils/interfaces/token.interface";
import { verifyToken } from "@/utils/token";
import axios from "axios";
import {Request,Response,NextFunction} from "express";
import jwt,{verify} from "jsonwebtoken";


async function authenticatedMiddleware(
    req:Request,
    res:Response,
    next:NextFunction
):Promise<Response | void>{
const bearer=req.headers.authorization;
if(!bearer || !bearer.startsWith("Bearer ")){
    // return res.status(401).json({error:"Unauthorized"});
    return next(new HttpException(401,"Unauthorized"));

}

const accessToken=bearer.split("Bearer ")[1].trim();
try {
    
    const { data } = await axios.get(
        `${process.env.USER_SERVICE_URL}/verify-token/${accessToken}`
      );
    const user=await userModel.findById(data.payload.id).select("-password").exec();
    if(!user){
        return next(new HttpException(401,"Unauthorized"));
    }

    req.user=user;
    next();
} catch (error) {
    return next(new HttpException(401,"Unauthorized"));
    
}

}

export default authenticatedMiddleware;