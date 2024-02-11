import Joi from 'joi';

const create= Joi.object({
    name:Joi.string().required(),

    amount:Joi.number().required(),
    

})

export default {create}