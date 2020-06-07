const merge = require("lodash.merge");
// import custom scalar definitions
const date = require("./scalars/date");
// import app resouces to construct gql server
const user = require("./resources/user");
const recipe = require("./resources/recipe");
// construct typedefs from resources
const typeDefs = [date.typeDefs, user.typeDefs, recipe.typeDefs].join(" ");

// combine resolvers from all resources
const resolvers = merge(date.resolvers, user.resolvers, recipe.resolvers);

// combine models from all resources
const models = {
  User: user.model,
  Recipe: recipe.model,
};

module.exports = {
  typeDefs,
  resolvers,
  models,
};
