import { modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})

export class Ingredient {
  @prop({ default: '', trim: true })
  name: string

  @prop({ default: '', trim: true })
  description: string

  @prop({ default: 0 })
  amount: number
};