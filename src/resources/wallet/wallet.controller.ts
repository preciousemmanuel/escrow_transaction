import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import WalletService from "@/resources/wallet/wallet.service";
import validate from "@/resources/wallet/wallet.validation";



class WalletController implements Controller {
    public path = "/wallet";
    public router = Router();
    private walletService=new WalletService();

    constructor() {
        this.initializeRoute();
    }

    initializeRoute(): void {
        this.router.post(
            `${this.path}/signup`,
            validationMiddleware(validate.signup),
            this.signup
        )
    }

    private signup = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {

        } catch (error) {
            next(new HttpException(400, "Something went wrong"))
        }
    }
}

export default WalletController;