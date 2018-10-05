const Hero = require('./hero.model');

require('./mongo').connect();

function getHeroes(req,res){
    const docquery = Hero.find({});
    docquery.exec()
    .then(heroes=>{
        res.status(200).json(heroes);
    })
    .catch(error=>{
        res.status(500).send(error);
        return;
    });
}

function postHeroes(req,res){
    const originalHero = {id:req.body.id,name:req.body.name};
    const hero =new Hero(originalHero);
    hero.save(error=>{
        if(checkServerError(res,error))return;
        res.status(201).json(hero);
        console.log('hero created successfully!');
    });
}

function putHeroes(req,res){
    const id = parseInt(req.params.id,10);
    const updateHero = {id:req.body.id,name:req.body.name};
    Hero.findOne({id:id},(error,hero)=>{
        if(checkServerError(res,error))return;
        if(!checkFound(res,hero))return;
        hero.name=updateHero.name;

        hero.save(error=>{
            if(checkServerError(res,error))return;
            res.status(200).json(hero);
            console.log('hero updated successfully!');
        });
    });
}

function deleteHeroes(req,res){
    const id = parseInt(req.params.id,10);
    Hero.findOneAndRemove({id:id})
    .then(hero=>{
        if(!checkFound(res,hero)) return;
        res.status(200).json(hero);
        console.log('Hero deleted');
    })
    .catch(error=>{if(checkServerError(res,error))return;});
}

function checkFound(res,hero){
    if(!hero){
        res.status(404).send('Hero not found');
        return;
    }
    return hero;
}

function checkServerError(res,error){
    if(error){
        res.status(500).send(error);
        return error;
    }
}

module.exports = {getHeroes,postHeroes,putHeroes,deleteHeroes};