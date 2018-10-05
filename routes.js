const express = require('express');
const router = express.Router();

const userService = require('./services/user.service');

router.get('/users',(req,res)=>userService.getUsers(req,res));
router.post('/users',(req,res)=>userService.postUsers(req,res));
router.put('/users/:id',(req,res)=>userService.putUsers(req,res));
router.delete('/users/:id',(req,res)=>userService.deleteUsers(req,res));

module.exports = router;