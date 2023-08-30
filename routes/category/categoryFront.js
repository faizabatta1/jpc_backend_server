const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find({});
        res.render('categories/index', { categories });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/categories/create', (req, res) => {
    res.render('categories/create');
});


router.get('/categories/:id/edit', async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        res.render('categories/edit', { category });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
