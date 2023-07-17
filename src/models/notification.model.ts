import { modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})

export class Notification {
  @prop({ default: false })
  notifications: boolean

  @prop({ default: false })
  notifyVersion: boolean
};