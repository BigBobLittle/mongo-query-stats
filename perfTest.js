const mongoose = require("mongoose");
const casual = require("casual");

const { UserSchema, IndexUser } = require("./db/user");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost/queries", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    await init();
     const query = { age: { $gt: 22 } }
   // const query = { favoriteFruit: "potato" };

    console.time("default_query");
    const bob = await IndexUser.find(query).countDocuments();
    console.timeEnd("default_query");
    console.log(bob);

    // console.time('query_with_index')
    // await UserSchema.find(query)
    // console.timeEnd('query_with_index')

    // console.time('query_with_select')
    // await IndexUser.find(query)
    //   .select({ name: 1, _id: 1, age: 1, email: 1 })
    // console.timeEnd('query_with_select')

    // console.time('query_with_select_index')
    // await UserSchema.find(query)
    //   .select({ name: 1, _id: 1, age: 1, email: 1 })
    // console.timeEnd('query_with_select_index')

    // console.time('lean_query')
    // await IndexUser.find(query).lean()
    // console.timeEnd('lean_query')

    // console.time('lean_with_index')
    // await UserSchema.find(query).lean()
    // console.timeEnd('lean_with_index')

    // console.time('lean_with_select')
    // await IndexUser.find(query)
    //   .select({ name: 1, _id: 1, age: 1, email: 1 })
    //   .lean()
    // console.timeEnd('lean_with_select')

    // console.time('lean_select_index')
    // await IndexUser.find(query)
    //   .select({ name: 1, _id: 1, age: 1, email: 1 })
    //   .lean()
    // console.timeEnd('lean_select_index')

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
})();

populateWithDummyData = numberOfItems => {
  const docs = [...new Array(numberOfItems)].map((_, index) => ({
    email: casual.email,
    name: casual.name,
    age: casual.integer(0, 100),
    details: casual.array_of_integers(100),
    birthdate: new Date(casual.date("YYYY-MM-DD")),
    favouriteFruit: index % 2 === 0 ? "tomato" : "potato"
  }));

  return Promise.all([IndexUser.insertMany(docs), UserSchema.insertMany(docs)]);
};

async function init() {
  console.log("cleaning db");
  await Promise.all([IndexUser.deleteMany({}), UserSchema.deleteMany({})]);
  console.log("db cleaned");

  const numberOfItems = 1000;
  console.log(`adding ${numberOfItems} users to the database`);
  await populateWithDummyData(numberOfItems);
  console.log(`finished populating ${numberOfItems} users`);
}
