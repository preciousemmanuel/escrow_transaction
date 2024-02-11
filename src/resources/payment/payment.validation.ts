import Joi from 'joi';

const initiate= Joi.object({
    escrowId:Joi.string().required(),
    amount:Joi.number().required()
    
    

})

export default {initiate}