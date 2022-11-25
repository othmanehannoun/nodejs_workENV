const express= require('express');
const bodyParser= require('body-parser');
const fs = require('fs');
const app= express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

//router
global.__basedir = __dirname;
app.use(cors());


let routeClient = require('./routes/Client.route.js');
let routeAdmin = require('./routes/admin_route.js');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));

//Route
app.use("/api", routeClient);
app.use("/api/admin", routeAdmin),


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTION");
    next();
    });
    
app.use("/", express.static(path.join(__dirname, "/uploads")));


app.use(function(req, res, next) {
    res.status(404).send('Sorry Dont find this route');
});
  
  // error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json(err);
  });
const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.info(`Server listen this Port ${PORT}`);
});