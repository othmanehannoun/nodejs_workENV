const express= require('express');
const Client = require('../controllers/Client.Controller.js');
// const Pdf = require('../controllers/Pdf_file.Controller.js');
const route = express.Router();

route.post('/client/login', Client.Login);
module.exports=route;


