const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/settings',(req,res) =>{
    let credentialsJson = {
        username: "admin",
        password: "admin"
    }


    return res.status(200).render('settings/index',{
        username: credentialsJson.username,
        password: credentialsJson.password,

    })
})


module.exports = router