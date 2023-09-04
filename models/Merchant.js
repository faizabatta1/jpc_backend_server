const mongoose = require('mongoose')

const merchantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    city:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    },
    password:{
        type: String,
        required: true
    }
})

const Merchant = mongoose.model('Merchant', merchantSchema)
module.exports = Merchant