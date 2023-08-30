const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
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
const Product = require('./Product')

providerSchema.pre('remove',{},async function (next) {
    // await Product.deleteMany({
    //     provider: this._id
    // });

    next()
})

const Provider = mongoose.model('Provider', providerSchema)
module.exports = Provider