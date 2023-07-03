import { prop, getModelForClass } from '@typegoose/typegoose';

// 1 - Hot, 2 - Cold, 3 - Normal
class TemperatureCategory {
  @prop()
  name: string

  @prop()
  value: number
}

class Ingredient {
  @prop({ type: String, default: '', trim: true })
  name: string

  @prop({ type: String, default: '', trim: true })
  description: string

  @prop({ type: Number, default: 0 })
  amount: number
};

class Author {
  @prop({ type: Number, default: 1 })
  id: number

  @prop({ type: String, default: '', trim: true })
  name: string

  @prop({ type: String, default: '', trim: true })
  lastName: string

  @prop({ type: Number, default: 0 })
  role: number
}
class Recipe {
  @prop({ type: String, required: true, default: 'New recipe', trim: true })
  title: string

  @prop({ type: String, required: true, default: 'Description of the new recipe', trim: true })
  description: string

  @prop()
  ingredients: Ingredient[]

  @prop({ type: String, required: true, default: 'Steps of the new recipe', trim: true })
  steps: string

  @prop({ type: Number, default: 0 })
  cookingTime: number

  @prop({ type: Number, default: 0 })
  temperatureCategory: number

  @prop()
  categories: object[]

  @prop({ type: String, default: '', trim: true })
  origin: string

  @prop({ type: String, default: '', trim: true })
  photo: string

  @prop()
  author: Author

  @prop({ type: Date, default: Date.now() })
  createDate: Date

  @prop({ type: Boolean, default: true })
  active: boolean

  @prop({ type: Number, default: 0 })
  likes: number

  @prop({ type: Number, default: 0 })
  score: number
};

const RecipeModel = getModelForClass(Recipe);
export default RecipeModel;
