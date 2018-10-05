const express = require('express');
const router = express.Router();

const heroService = require('./hero.service');

router.get('/heroes',(req,res)=>{
    heroService.getHeroes(req,res);
});
router.post('/heroes',(req,res)=>{
    heroService.postHeroes(req,res);
});
router.put('/heroes/:id',(req,res)=>{
    heroService.putHeroes(req,res);
});
router.delete('/heroes/:id',(req,res)=>{
    heroService.deleteHeroes(req,res);
});

module.exports = router;