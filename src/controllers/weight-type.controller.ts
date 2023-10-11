import { Request, Response } from 'express';
import _ from 'underscore';
import WeightType from '../models/weight-type.model';

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

export const getWeightType = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const weightTypeDB = await WeightType.find({ _id });
    res.json(weightTypeDB[0]);
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

export const editWeightTypeAdmin = async (req: Request, res: Response) => {
  const _id = req.body._id;
  const body = _.pick(req.body, ['name']);

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

export const deleteWeightTypeAdmin = async (req: Request, res: Response) => {
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

export const getWeightTypesForPanel = async (req: Request, res: Response) => {
  try {
    const weightTypesDB = await WeightType.find().countDocuments();
    
    const weightTypes = {
      id: String(new Date().getTime()),
      title: 'tiposDePeso',
      page: 'admin-weight-types',
      total: weightTypesDB,
      showChart: false,
      order: 6,
    };

    res.json(weightTypes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};
