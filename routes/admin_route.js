const express = require('express')
const router = express.Router()

const { testApp } = require("../controllers/Admin_Controller.js");


router.post('/testApp', testApp);


module.exports = router