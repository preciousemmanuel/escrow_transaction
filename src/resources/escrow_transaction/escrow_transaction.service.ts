import EscrowTransaction from "@/resources/escrow_transaction/escrow_transaction.interface";
import EscrowModel from "@/resources/escrow/escrow.model";
import { createSkuTag } from "@/utils/helpers";

import logger from "@/utils/logger";


class EscrowTransactionService {
    private escrow = EscrowModel;

    public async create(

        escrowId: string,
        sellerId: string,
        buyerId: string,
        amount: number,
        description: string = "",


    ): Promise<Escrow | Error> {

        try {


            const createdEscrow = await this.escrow.create({
                name,
                amount,
                description,
                created_by: userId
            });

            if (!createdEscrow) {
                throw new Error("Cannot create Escrow at the moment");

            }

            createdEscrow.sku = createSkuTag(name, createdEscrow.id);
            createdEscrow.save();
            return createdEscrow;
        } catch (error: any) {
            logger.error(`CannotCreateEscrowError - ${error.toString()}`);
            throw new Error(`cannnot create escrow ${error.toString()} `);
        }

    }





    public async getEscrowById(id: string): Promise<Escrow | null | Error> {
        try {
            const escrow = await this.escrow.findById(id);
            if (!escrow) {
                return null
            }
            return escrow;
        } catch (error: any) {
            logger.error(`escrowEror-${error.toString()}`);
            throw new Error("Something went wrong")
        }


    }



    public async getEscrowBySku(data: string): Promise<Escrow | null | Error> {
        try {
            const user = await this.escrow.findOne({
                sku: data
            });
            if (!user) {
                return null
            }
            return user;
        } catch (error: any) {
            logger.error(`escrowNotFound-${error.toString()}`);
            throw new Error("Something went wrong")
        }


    }
}

export default EscrowTransactionService;