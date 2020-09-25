const mongoose = require('mongoose'); 


// const Kitten = mongoose.model('KittenSchema', new mongoose.Schema({
//     name:String
// }))

const KittenSchema = new mongoose.Schema({name:String});



KittenSchema.methods.speak = function(){
    let greetings = this.name ?  "Meow name is"+this.name : "i dont have a name"; 
    console.log(greetings);

}
let Kitten = mongoose.model('Kitten', KittenSchema);

//schema 2
const BlogSchema =  new mongoose.Schema({
  title:String,
  author:String,
  fullname:{
    firstname: String,
    lastName: String
  },
  body:String,
  comments: [{body:String, data:Date}],
  date:{type:Date, default:Date.now()},
  hidden:Boolean,
  meta:{
      votes:Number,
      favs: Number
  },
  cats: [KittenSchema]
})



/***
 * SCHEMA METHODS 
 * MUST BE INVOKED BY AN INSTANCE OF MONGOOSE DOCS 
 * creating instances 
 * attached to all documents in Blog
 * EG. 
 * you have to call c
 * 
 * let bob = new Blog();
 * befor u can do 
 * bob.findSimilarTypes(....)
 */
BlogSchema.methods.findSimilarTypes = function(cb){

  return this.model('BlogSchema').find({hidden: this.hidden}, cb);

}

/**
 * SCHEMA STATICS
 * CAN BE INVOKED DIRECTLY BY A MODEL WITHOUT CREATING A NEW INSTANCE 
 */
BlogSchema.statics.findByName = function(name, cb){
  return this.find({author: new RegExp(name, 'i')}, cb)
}


/**
 * query helpers 
 * like instance methods, but attached to queries 
 */

 BlogSchema.query.byName = function(name){
   return this.find({author: new RegExp(name, 'i')});
 }


 /**
  * VIRTUALS 
  */
 BlogSchema.virtual('fullName').get(function(){
   return this.fullname.lastName+ ' ' + this.fullname.firstname
 });

let Blog = mongoose.model('BlogSchema', BlogSchema);


module.exports = {Kitten,Blog}