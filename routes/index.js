const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // This is the route to views EJS Template (views/homepage)
    res.render('homepage');
});

module.exports = router;
