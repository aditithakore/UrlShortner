const express = require('express');
const router= express.Router();
const {generateShortUrl,returnToUrl,getAnalytics} = require('../controllers/url');

router.post('/',generateShortUrl);

router.get('/:id',returnToUrl);

router.get('/analytics/:id',getAnalytics);
module.exports = router;