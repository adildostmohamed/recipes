const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe must have a title"],
    },
    servings: {
      type: Number,
      required: [true, "Recipe must have servings"],
    },
    prepTime: {
      type: Number,
      required: [true, "Recipe must have prep time"],
    },
    cookingTime: {
      type: Number,
      required: [true, "Recipe must have cooking time"],
    },
    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
