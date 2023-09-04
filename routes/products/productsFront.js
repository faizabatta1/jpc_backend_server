const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')

router.get('/products',async (req,res) =>{
    try{
        let products = await Product.find({}).populate([
            {
                path: 'category',
                ref: 'Category'
            },
            {
                path: 'provider',
                ref: 'Provider'
            }
        ])
        return res.status(200).render('products/index',{
            products
        })

    }catch (error){
        return res.status(500).json(error.message)
    }
})

module.exports = router

