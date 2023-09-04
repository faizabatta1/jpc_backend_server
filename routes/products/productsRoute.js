const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')

router.get('/products',async (req,res) =>{
    try{
        let products = await Product.find({})
        return res.status(200).json(products)
    }catch (error){
        return res.status(500).json(error.message)
    }
})

router.get('/products/category/:id', async (req,res) =>{
    try{
        let categoryId = req.params.id
        let products = await Product.find({
            category: categoryId
        }).populate([
            {
                path: 'category',
                ref: 'Category'
            },
            {
                path: 'provider',
                ref: 'Provider'
            }
        ])

        return  res.status(200).json(products)
    }catch (error){
        return res.status(500).json(error.message)
    }
})

router.delete('/products/:id',async (req,res) =>{
    try{
        await Product.deleteOne({
            _id: req.params.id
        })

        return res.sendStatus(200)
    }catch (error){
        return res.status(500).json(error.message)
    }
})

router.put('/products/:id',async (req,res) =>{
    try{
        await Product.findOneAndUpdate({_id: req.params.id},req.body,{ $new: true })
        return res.sendStatus(200)
    }catch (error){
        return res.status(500).json(error.message)
    }
})

module.exports = router