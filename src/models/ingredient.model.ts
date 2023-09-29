import { modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})

export class Ingredient {
  @prop({ default: '', trim: true, required: true, maxlength: 100 })
  name: string

  @prop({ default: 0, required: true })
  quantity: number

  @prop({ default: '', trim: true, required: true, maxlength: 20 })
  type: string
};
