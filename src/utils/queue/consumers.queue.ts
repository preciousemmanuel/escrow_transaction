import WalletService from "@/resources/wallet/wallet.service";
import logger from "@/utils/logger";


async function fnConsumerCreateWallet(msg:string,callback:Callback){
    try {
        const userId = JSON.parse(msg);
        logger.info(`createuserWaleet - ${userId}`);
        
        const walletService=new WalletService();
        walletService.create(userId)
        callback(true);
    } catch (error) {
        callback(false);
        
    }
}

export {fnConsumerCreateWallet}
