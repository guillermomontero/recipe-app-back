import { prop, getModelForClass } from '@typegoose/typegoose';

class Sequence {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, default: 1 })
  public value: number;
}

const SequenceModel = getModelForClass(Sequence);
export default SequenceModel;