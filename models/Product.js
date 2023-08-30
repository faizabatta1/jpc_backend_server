const mongoose = require('mongoose');

// Define the User schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ""
    },
    price:{
        type: Number,
        required: true
    },
    hasDiscount:{
        type: Boolean,
        default: false
    },
    discount:{
        type: Number,
        default: 0
    },
    imageUrl:{
      type: String,
      required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    }
});

// Define the User model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
