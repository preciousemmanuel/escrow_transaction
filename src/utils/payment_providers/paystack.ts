import axios from "axios";
import logger from "@/utils/logger";
import Payment from "@/utils/interfaces/external_payment.interface";


class PaystasckProvider {

    async initialiazePayment(email: string, amount: number, txRef: string): Promise<Payment | Error> {
        const payload = {
            email,
            amount: amount * 100,
            metadata: {
                txRef
            }
        };

        try {
            const { data } = await axios.post(`${process.env.PAYSTACK_URL}/initialize` as string, payload,
                {
                    headers: {
                        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET}`
                    }
                });
            return data
        } catch (error: any) {
            logger.error(`paystacinitiateError- ${error.toString()}`)

            throw new Error(error.toString());
        }


    }

    async verifyPaymentWebhookCallBack(event: any) {

    }

    async verifyPayment(reference: string): Promise<void | Error> {
        try {
            const { data } = await axios.get(`${process.env.PAYSTACK_URL}/verify/${reference}` as string,
                {
                    headers: {
                        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET}`
                    }
                });


        } catch (error: any) {
            logger.error(`paystackverifyError- ${error.toString()}`)
            throw new Error(error.toString())
        }
    }
}

export default PaystasckProvider;