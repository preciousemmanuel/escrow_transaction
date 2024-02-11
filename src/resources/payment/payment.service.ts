import Payment from "@/resources/payment/payment.interface";
import PaymentModel from "@/resources/payment/payment.model";
import data from "@/utils/data";
import { createSkuTag } from "@/utils/helpers";
import ExternalPayment from "@/utils/interfaces/external_payment.interface";

import logger from "@/utils/logger";
import PaystasckProvider from "@/utils/payment_providers/paystack";
import User from "@/resources/user/user.interface";


class PaymentService {
    private payment = PaymentModel;

    public getRandomRef = ():string => {
        const getRef = () => {
          const nums = "0123456789";
          let rand = "";
          for (let i = 0; i < 5; i++) {
            rand += nums[Math.floor(Math.random() * 10)];
          }
          return rand;
        };
        const randRef = `Trust${getRef()}${Date.now()}`;
      
        return randRef;
      };

    public async initialize(

        escrowId: string,
        user: User,
        amount: number,
      


    ): Promise<ExternalPayment | Error> {

        try {


            const reference:string=this.getRandomRef();
            const createdPayment = await this.payment.create({
               status:data.status.PENDING,
                amount,
                escrow:escrowId,
                user: user.id,
                reference
            });

            if (!createdPayment) {
                throw new Error("Cannot create payment at the moment");

            }
            const paystackProvider =new PaystasckProvider();
           const initialiedPayment= paystackProvider.initialiazePayment(
                user?.email as string,
                amount,
                reference
            );

           return initialiedPayment;
        } catch (error: any) {
            logger.error(`CannotCreateEscrowError - ${error.toString()}`);
            throw new Error(`cannnot create escrow ${error.toString()} `);
        }

    }





  



   
}

export default PaymentService;