import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Ingredient } from './ingredient.model';
import { User } from './user.model';

class Recipe {
  @prop({ required: true, default: 'New recipe', trim: true, maxlength: 50 })
  title: string

  @prop({ required: true, default: 'Description of the new recipe', trim: true, maxlength: 100 })
  description: string

  @prop({ type: () => [Ingredient]})
  ingredients: Ingredient[]

  @prop({ required: true, default: 'Steps of the new recipe', trim: true, maxlength: 10000 })
  steps: string

  @prop({ default: 0, required: true })
  cookingTime: number

  @prop({ default: 0, required: true })
  unitTime: number

  @prop({ default: 0, required: true })
  temperatureCategory: number

  @prop({ type: Number, default: () => [] })
  categories: number[]

  @prop({ default: '', trim: true, required: true, maxlength: 10 })
  origin: string

  @prop({ default: 1, required: true })
  portions: number

  @prop({ default: '', trim: true, maxlength: 200 })
  photo: string

  @prop({ ref: () => User, required: true })
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
