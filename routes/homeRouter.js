const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const authenticate = require('../authenticate');

var path = require('path');

const homeRouter = express.Router();

homeRouter.use(bodyParser.json());

//Serving static files
homeRouter.use(express.static(path.join(__dirname, '../public/HOME PAGE')));

homeRouter.route('/')

.get((req, res, next) =>{
    //res.sendfile('public\HOME PAGE\index.html');
    res.sendFile(path.join(__dirname, '../public/HOME PAGE', 'index.html'));
    
})


homeRouter.route('/cart')

.get((req, res, next) =>{
    //res.sendfile('public\HOME PAGE\index.html');
    res.sendFile(path.join(__dirname, '../public/HOME PAGE', 'cart.html'));
    
})



homeRouter.route('/:serviceId')
.get((req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public/HOME PAGE', 'deepClean.html'));
})

module.exports = homeRouter;