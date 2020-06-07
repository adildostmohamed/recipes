const { ApolloError } = require("apollo-server");
const findResourceById = async (ctx, modelName, id = null) => {
  try {
    const Model = ctx.models[modelName];
    const resource = await Model.findById(id);
    if (!resource) {
      throw new ApolloError(`Could not find ${modelName} with id ${id}`);
    }
    return item;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const findAllResources = async (ctx, modelName) => {
  try {
    const Model = ctx.models[modelName];
    const resources = await Model.find({}).exec();
    return resources;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const findOneResourceWhere = async (ctx, modelName, where = {}) => {
  try {
    const Model = ctx.models[modelName];
    const resource = await Model.findOne(where).exec();
    return resource;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const createResource = async (ctx, modelName, input = {}) => {
  try {
    const Model = ctx.models[modelName];
    const newResource = await Model.create(input);
    return newResource;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const updateResource = async (ctx, modelName, id = null, input = {}) => {
  try {
    const Model = ctx.models[modelName];
    const resource = await Model.findById(id);
    if (!resource) {
      throw new ApolloError(`Could not find ${modelName} with id ${id}`);
    }
    const updatedResource = await Model.findByIdAndUpdate(id, input, {
      new: true,
    });
    return updatedResource;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const deleteResource = async (ctx, modelName, id = null) => {
  try {
    const Model = ctx.models[modelName];
    const resource = await Model.findById(id);
    if (!resource) {
      throw new ApolloError(`Could not find ${modelName} with id ${id}`);
    }
    const deletedResource = await Model.findByIdAndRemove(id);
    return deletedResource;
  } catch (error) {
    throw new ApolloError(error);
  }
};

module.exports = {
  findResourceById,
  findAllResources,
  findOneResourceWhere,
  createResource,
  updateResource,
  deleteResource,
};
