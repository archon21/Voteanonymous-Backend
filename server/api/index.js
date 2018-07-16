const express = require('express');
const router = express.Router();

router.use('/wallet', require('./wallet'));

module.exports = router;
