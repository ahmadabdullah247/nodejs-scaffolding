const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    sex: { type: String, enum: ['male', 'female'], required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    timestamps:true
});
const User = mongoose.model('User', userSchema);
module.exports = User;