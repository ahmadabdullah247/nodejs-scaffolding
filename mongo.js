const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const env = require('./env/enviroment');
// const mongoUri = `mongodb://${env.dbName};${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;
const mongoUri ='mongodb://nodejs-scaffolding:MKcuLza1jHW6z0gcNyBMSmhFJNwu4Sa5kae8vLA8xbkciRO4IMZhrznpCSaoFTd2tqzNazCgZ4VR5IxC6389Dg%3D%3D@nodejs-scaffolding.documents.azure.com:10255/?ssl=true';

function connect(){
    // return mongoose.connect(mongoUri,{useMongoClient:true});
    return mongoose.connect(mongoUri,{useNewUrlParser: true});

}

module.exports = {connect};