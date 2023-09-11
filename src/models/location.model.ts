import { modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})

export class Location {
  @prop({ default: '', trim: true, maxlength: 200 })
  address: string

  @prop({ default: '', trim: true, maxlength: 200 })
  city: string

  @prop({ default: '', trim: true, maxlength: 200 })
  state: string

  @prop({ default: '', trim: true, maxlength: 200 })
  country: string

  @prop({ default: 0 })
  postCode: number
};