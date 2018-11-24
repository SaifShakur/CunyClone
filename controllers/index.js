const express = require('express');
const router = express.Router();

router.use('/getters', require('./getters'));


module.exports = router;
