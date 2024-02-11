import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import PaymentService from "@/resources/payment/payment.service";
import validate from "@/resources/payment/payment.validation";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import { responseObject } from "@/utils/http.response";
import httpcode from "@/utils/httpcode";



class PaymentController implements Controller {
    public path = "/payment";
    public router = Router();
    private paymentService=new PaymentService();

    constructor() {
        this.initializeRoute();
    }

    initializeRoute(): void {
        this.router.post(
            `${this.path}/initiate`,
            authenticatedMiddleware,
            validationMiddleware(validate.initiate),
            this.initiatePayment
        );

        this.router.post(
            `${this.path}/webhook`,
         
            
            this.webhook
        )
    }

    private initiatePayment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {
            const {escrowId,amount}=req.body;
         const result =  await this.paymentService.initialize(escrowId,req.user,amount);
          responseObject(res, httpcode.HTTP_CREATED, "success", "payment initiated", result);


        } catch (error) {
            next(new HttpException(400, "Something went wrong"))
        }
    }

    private webhook = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {
            const {escrowId,amount}=req.body;
       
          responseObject(res, httpcode.HTTP_OK, "success","");


        } catch (error) {
            next(new HttpException(400, "Something went wrong"))
        }
    }
}

export default PaymentController;