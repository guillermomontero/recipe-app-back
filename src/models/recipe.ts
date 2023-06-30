import { Schema, model } from 'mongoose';

// 1 - Hot, 2 - Cold, 3 - Normal
const temperatureCategoryType = {
  values: [1, 2, 3],
  message: '{VALUE} - Temperature type is invalid'
}

// const ingredientsSchema = {
//   name: { type: String, default: '', trim: true },
//   amount: { type: Number, default: 0 },
// };

const authorSchema = {
  id: { type: Number, default: 1 },
  name: { type: String, default: '', trim: true },
  lastName: { type: String, default: '', trim: true },
  role: { type: Number, default: 0 },
};

interface IRecipe {
  title: String,
  description: String,
  ingredients: Object[],
  steps: String,
  cookingTime: Number,
  temperatureCategory: Number,
  categories: Object[],
  origin: String,
  photo: String,
  author: Object,
  createDate: Date,
  active: Boolean,
  likes: Number,
  score: Number,
};

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true, default: 'New recipe', trim: true },
  description: { type: String, required: true, default: 'Description of the new recipe', trim: true },
  ingredients: [Object],
  steps: { type: String, required: true, default: 'Steps of the new recipe', trim: true },
  cookingTime: { type: Number, default: 0 },
  temperatureCategory: { type: Number, default: 0, enum: temperatureCategoryType },
  categories: [Object],
  origin: { type: String, default: '', trim: true },
  photo: { type: String, default: '', trim: true },
  author: authorSchema,
  createDate: { type: Date, default: Date.now() },
  active:{ type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

// Convert to model
export default model('Recipe', recipeSchema);
