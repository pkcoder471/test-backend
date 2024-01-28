const express=require('express');
const Router = express.Router();

Router.use('/user',require('./user'));


module.exports=Router;
