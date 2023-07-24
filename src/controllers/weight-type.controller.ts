import { Request, Response } from 'express';
import WeightType from '../models/weight-type.model';
import _ from 'underscore';

export const getAllWeightTypes = async (req: Request, res: Response) => {
  try {
    const weightTypesDB = await WeightType.find();
    
    res.send(weightTypesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const createWeightType = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const weightTypeDB = new WeightType(payload);
    await weightTypeDB.save();
    
    res.json(weightTypeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const deleteWeightType = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await WeightType.findByIdAndDelete({ _id });
    const weightTypesDB = await WeightType.find();

    res.json(weightTypesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const editWeightType = async (req: Request, res: Response) => {
  const _id = req.body._id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
  ]);

  try {
    const weightTypeDB = await WeightType.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(weightTypeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};
