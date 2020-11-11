const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

dotenv.config();

const uriDB = `mongodb+srv://Robert:${process.env.DB_PASSWORD}@first-cluster.s2e70.mongodb.net/amazon_merng?retryWrites=true&w=majority`;

const main = async () => {
  try {
    await mongoose.connect(uriDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // context: contextMiddleware,
      // subscriptions: { path: "/" },
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
      // console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`)
    });
  } catch (error) {
    console.error(error);
  }
};

main().catch((err) => {
  console.error(err);
});
