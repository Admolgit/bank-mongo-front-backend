import mongoose from 'mongoose';
import Joi from 'joi';
import User from './user'
const Schema = mongoose.Schema
const balanceShema = new mongoose.Schema({
    accountNumber: {
        type: String,
        unique: true,
        length: 10,
        required: true,
    },
    balance : {
        type : Number,
        default: 5000,
        required: true,
        trim: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Registered ID required to create an account number',]
    }

},
    {
        timestamps: true
    }
)
const Balance = mongoose.model('balanceModel', balanceShema)

export default Balance;