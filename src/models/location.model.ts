import { modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})

export class Location {
  @prop({ default: '', trim: true })
  address: string

  @prop({ default: '', trim: true })
  city: string

  @prop({ default: '', trim: true })
  state: string

  @prop({ default: '', trim: true })
  country: string

  @prop({ default: 0 })
  postCode: number
};