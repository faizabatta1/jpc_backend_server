const express = require('express')
const router = express.Router()
const Provider = require('../../models/Merchant')

router.get('/providers', async (req,res) =>{
    let providers = await Provider.find({})
    return res.status(200).render('merchants/index',{
        providers
    })
})

module.exports = router