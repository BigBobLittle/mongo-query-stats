const mongoose = require('mongoose');

const UserSchema = mongoose.model('UserWithNoIndex', new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    details: mongoose.Schema.Types.Mixed,
    birthday: Date,
    favouriteFruit: String
}));




const IndexUser = mongoose.model('UserWithIndex', new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    details: mongoose.Schema.Types.Mixed,
    birthday: Date,
    favouriteFruit: String
}));

//UserWithIndex.index({age: -1})




module.exports = {UserSchema, IndexUser};