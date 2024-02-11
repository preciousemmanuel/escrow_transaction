import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import UserService from "@/resources/user/user.service";
import validate from "@/resources/user/user.validation";



class UserController implements Controller {
    public path = "/user";
    public router = Router();
    private userService=new UserService();

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

export default UserController;