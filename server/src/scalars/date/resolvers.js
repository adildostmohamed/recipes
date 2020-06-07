const {
  GraphQLDateTime,
  GraphQLDate,
  GraphQLTime,
} = require("graphql-iso-date");

module.exports = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
};
