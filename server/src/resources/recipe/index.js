const fs = require("fs");
const path = require("path");

const model = require("./model");
const resolvers = require("./resolvers");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./", "typeDefs.graphql"),
  "utf-8"
);

module.exports = {
  model,
  resolvers,
  typeDefs,
};
