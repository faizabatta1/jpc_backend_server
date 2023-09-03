const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')

router.get('/categories',async (req,res) =>{
    try{
        let categories = await Category.find();
        return res.status(200).json(categories)
    }catch (error){
        return res.status(500).json(error.message)
    }
})

router.post('/categories', async (req,res) =>{
    try{
        const { name } = req.body
        let category = new Category({ name })
        await category.save()
        return res.status(200).json(category)
    }catch (error){
        console.log(error.message)
        return res.status(500).send(error.message)
    }
})


router.delete('/categories/:id', async (req,res) =>{
    try{
        console.log(req.params)
        await Category.deleteOne({ _id: req.params.id })
        return res.status(200).send("Deleted")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.delete('/categories', async (req,res) =>{
    try{
        await Category.deleteMany({})
        return res.status(200).send("All Groups Were Deleted")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.put('/categories/:id', async (req,res) =>{
    try{
        const { name } = req.body
        let updated = await Category.findOneAndUpdate({ _id: req.params.id },{
            name
        },{ $new: true })
        if(updated) console.log('yes updated')
        else console.log('not updated')

        return res.status(200).send("Updated")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

module.exports = router