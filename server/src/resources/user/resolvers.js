const { AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const {
  findResourceById,
  findAllResources,
  findOneResourceWhere,
  createResource,
  updateResource,
  deleteResource,
} = require("../../controllers");

const modelName = "User";

const currentUser = (parent, args, ctx, info) => {
  return ctx.user;
};

const updateCurrentUser = async (parent, args, ctx, info) => {
  const updatedUser = await updateResource(
    ctx,
    modelName,
    ctx.user._id,
    args.input
  );
  return updatedUser;
};

const deleteCurrentUser = async (_, args, ctx) => {
  const deletedUser = await deleteResource(ctx, modelName, args._id);
  return deletedUser;
};

const users = async (_, __, ctx) => {
  const users = await findAllResources(ctx, modelName);
  return users;
};

const user = async (_, args, ctx) => {
  const user = await findResourceById(ctx, modelName, args._id);
  return user;
};

const adminCreateUser = async (_, args, ctx) => {
  const newUser = await createResource(ctx, modelName, args.input);
  return newUser;
};

const adminUpdateUser = async (_, args, ctx) => {
  const updatedUser = await updateResource(
    ctx,
    modelName,
    args.input._id,
    args.input
  );
  return updatedUser;
};

const adminDeleteUser = async (_, args, ctx) => {
  const deletedUser = await deleteResource(ctx, modelName, args._id);
  return deletedUser;
};

const signup = async (_, args, ctx) => {
  const existingUser = await findOneResourceWhere(ctx, modelName, {
    email: args.input.email,
  });
  if (existingUser) {
    throw new AuthenticationError("User already exists, sign in instead");
  }
  const user = await createResource(ctx, modelName, args.input);
  const token = ctx.createUserToken(user);
  return { user, token };
};

const login = async (_, args, ctx) => {
  const user = await findOneResourceWhere(ctx, modelName, {
    email: args.input.email,
  });
  if (!user) {
    throw new AuthenticationError("Wrong email and password combination");
  }
  try {
    const isPasswordMatch = await bcrypt.compare(
      args.input.password,
      user.password
    );
    if (!isPasswordMatch) {
      throw new AuthenticationError("Wrong email and password combination");
    }
    const token = ctx.createUserToken(user);
    return { user, token };
  } catch (e) {
    throw new AuthenticationError("Wrong email and password combination");
  }
};

module.exports = {
  Query: {
    currentUser,
    user,
    users,
  },
  Mutation: {
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUser,
    signup,
    login,
    updateCurrentUser,
    deleteCurrentUser,
  },
};
