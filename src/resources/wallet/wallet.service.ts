import Wallet from "@/resources/wallet/wallet.interface";
import WalletModel from "@/resources/wallet/wallet.model";
import { checkIfIsEmail } from "@/utils/helpers";
import logger from "@/utils/logger";


class WalletService {
    private wallet = WalletModel;

    public async create(
        userId: string,
    ): Promise<void | Error> {

        try {
            //check if wallet exists
            const walletFound = await this.getWalletById(userId);
            if (!walletFound) {
                await this.wallet.create({
                    user: userId,
                    totalAmount: 0
                });
            }

        } catch (error: any) {
            logger.error(`CannotCreateWallet - ${error.toString()}`);
            throw new Error(`cannnot create wallet ${error.toString()} `);
        }

    }





    public async getWalletById(id: string): Promise<Wallet | null | Error> {
        try {
            const wallet = await this.wallet.findOne({
                user: id
            });
            if (!wallet) {
                return null
            }
            return wallet;
        } catch (error: any) {
            logger.error(`walletNotFound-${error.toString()}`);
            throw new Error("Something went wrong")
        }


    }




}

export default WalletService;