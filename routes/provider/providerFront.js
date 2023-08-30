const express = require('express')
const router = express.Router()

router.get('/providers', (req,res) =>{
    return res.status(200).render('providers/index')
})

module.exports = router