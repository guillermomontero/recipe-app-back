import { prop, getModelForClass } from '@typegoose/typegoose';

export class Category {
  @prop({ default: '', trim: true })
  name: string

  @prop({ default: 0 })
  value: number
};

const CategoryModel = getModelForClass(Category);
export default CategoryModel;