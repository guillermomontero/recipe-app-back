import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Ingredient } from './ingredient.model';
import { User } from './user.model';

class Recipe {
  @prop({ required: true, default: 'New recipe', trim: true })
  title: string

  @prop({ required: true, default: 'Description of the new recipe', trim: true })
  description: string

  @prop({ type: () => [Ingredient]})
  ingredients: Ingredient[]

  @prop({ required: true, default: 'Steps of the new recipe', trim: true })
  steps: string

  @prop({ default: 0 })
  cookingTime: number

  @prop({ default: 0 })
  unitTime: number

  @prop({ default: 0 })
  temperatureCategory: number

  @prop({ default: () => [] })
  categories: number[]

  @prop({ default: '', trim: true })
  origin: string

  @prop({ default: 1, trim: true })
  portions: number

  @prop({ default: '', trim: true })
  photo: string

  @prop({ ref: () => User })
  author: Ref<User>

  @prop({ default: Date.now() })
  createDate: Date

  @prop({ default: true })
  draft: boolean

  @prop({ default: 0 })
  likes: number
};

const RecipeModel = getModelForClass(Recipe);
export default RecipeModel;
