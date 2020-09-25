const mongoose = require("mongoose");
const casual = require("casual");
const { Kitten, Blog } = require("./model/mongo");

//start mongodb
mongoose.connect("mongodb://localhost/learn-mongodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/**
 * MONGO QUERIES 😸
 */

 //fixme something to be done here @serious ㊙️
/**
 * find user whose last name is 'spencer', select 'author n hidden' field
 */
Blog.findOne({ "fullname.firstname": "mrs" }, "author hidden").exec(
  (err, one) => {
    //todo console.log('query to select last name matching a field, autor and hidden \n ' + one);
  }
);
//! testing better comments 💇

/** mongoose aggregation */
Blog.aggregate([
  {
    $project: {
      name: {
        $concat: ["$fullname.firstname", " ", "$fullname.lastName"]
      }
    }
  }
]).exec((err, aggregateName) => {
  // console.log("aggragate fxn \n" + aggregateName[0].name);
  aggregateName.map((_, index) => {
    // console.log( index,  _.name)
  });
  //console.log(Object.keys(aggregateName[0].name))
});

//task: use aggragation to find the sum ,avg, min, max of each users meta(favs, votes)
Blog.aggregate([
  // {
  //   $match: {
  //     author: "Mrs."
  //   }
  // },
  {
    $group: {
      _id: null,
      // name:{
      //   $concat: ["$fullname.firstname", " ", "$fullname.lastName"]
      // },
      favs: {
        $sum: "$meta.favs" 
      },
      votes:{
        $sum: "$meta.votes"
      },
      total:{
        $sum: "$meta.favs, $meta.votes"
      }
    }
  }
]).exec((err, date) => {
  date.map((_, index) => {
    console.log("date aggragation \n");
    console.log(_, index);
  });
});

/**
 * mongodb events to check error
 */
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  // console.warn("db open successfully");
  //init();
  //console.log('docs in blog schema ' + Blog.count({}));
});

/***
 *testing methods and chainable queries attached to schema
 */
//let testBlog = new Blog({fullname:{firstname:'bob', lastName:'little'}});
let testBlog = new Blog({
  cats: [{ name: "bob1" }, { name: "bob2" }, { name: "bob3" }]
});
testBlog.save();

let subDocs = testBlog.cats[0].name;
//console.log('subDocs.....\n' + subDocs)
//console.log('fullname' + testBlog.fullName);
testBlog.findSimilarTypes(function(err, match) {
  //console.log(match);
});

Blog.findByName("savannah", (err, names) => {
  // console.log('blog names for savannah ' + names)
});

Blog.findByName(/^Ms./, (err, names) => {
  //console.log(`\n` + names)
});

Blog.find()
  .byName(/^Dr./)
  //.count()
  .exec((err, doc) => {
    // console.log(doc);
  });

//dummy data to populate my scheama; 🎂


populateDbWithDummyData = numberOfItems => {
  const items = [...new Array(numberOfItems)].map((_, index) => ({
    title: casual.sentence,
    author: casual.name,
    fullname: {
      firstname: casual.first_name,
      lastName: casual.last_name
    },
    body: casual.sentences(2),
    comments: [
      { body: casual.sentence, data: new Date(casual.date("YYYY-MM-DD")) }
    ],

    hidden: index % 1 === 0 ? "true" : "false",
    meta: {
      votes: casual.integer(0, 1000),
      favs: casual.integer(0, 300)
    }
  }));

  return Promise.all([Blog.insertMany(items)]);
};

async function init() {
  await Blog.deleteMany({});
  const numberOfItems = 500;
  console.log(`adding ${numberOfItems} to Blog Schema`);
  await populateDbWithDummyData(numberOfItems);

  console.log("done adding " + numberOfItems + "to blog");
  process.exit(0);
}

//let silence = new Kitten({name: 'silence'});
//console.log(silence.name);

//let fluffy = new Kitten({name: 'fluffy'});
//console.log(fluffy.speak())

//let noname = new Kitten({name: 'fluf'});
//console.log(noname.speak());

//save to db
// noname.save((err, kittens) => {
//   if(err) throw err;
//   console.log(kittens.speak())
// })

//rich queries
// Kitten.find({name: /^fluff/}, (err, got) => {
//   console.log(got)
// })
