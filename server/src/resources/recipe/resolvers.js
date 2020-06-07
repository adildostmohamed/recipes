const {
  findResourceById,
  findAllResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../../controllers");

const modelName = "Recipe";

const recipe = async (parent, args, ctx, info) => {
  const recipe = await findResourceById(ctx, modelName, args._id);
  return recipe;
};

const recipes = async (parent, args, ctx, info) => {
  const recipes = await findAllResources(ctx, modelName);
  return recipes;
};

const createRecipe = async (parent, args, ctx, info) => {
  const recipe = await createResource(ctx, modelName, args.input);
  return recipe;
};

const updateRecipe = async (parent, args, ctx, info) => {
  const recipe = await updateResource(
    ctx,
    modelName,
    args.input._id,
    args.input
  );
  return recipe;
};

const deleteRecipe = async (parent, args, ctx, info) => {
  const recipe = await deleteResource(ctx, modelName, args._id);
  return recipe;
};

module.exports = {
  Query: {
    recipe,
    recipes,
  },
  Mutation: {
    createRecipe,
    updateRecipe,
    deleteRecipe,
  },
};
