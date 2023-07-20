import { modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})

export class Ingredient {
  @prop({ default: '', trim: true })
  name: string

  @prop({ default: 0 })
  amount: number

  @prop({ default: '', trim: true })
  type: string
};