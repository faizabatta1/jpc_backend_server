const express = require('express')
const router = express.Router()
const Provider = require('../../models/Provider')

router.get('/providers', async (req,res) =>{
    let providers = await Provider.find({})
    return res.status(200).render('providers/index',{
        providers
    })
})

module.exports = router