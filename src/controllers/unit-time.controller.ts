import { Request, Response } from 'express';
import UnitTime from '../models/unit-time.model';
import _ from 'underscore';

export const getAllUnitTimes = async (req: Request, res: Response) => {
  try {
    const unitTimesDB = await UnitTime.find();
    
    res.send(unitTimesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const createUnitTime = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const unitTimeDB = new UnitTime(payload);
    await unitTimeDB.save();
    
    res.json(unitTimeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const deleteUnitTime = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await UnitTime.findByIdAndDelete({ _id });
    const unitTimesDB = await UnitTime.find();

    res.json(unitTimesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const editUnitTime = async (req: Request, res: Response) => {
  const _id = req.body._id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
  ]);

  try {
    const unitTimeDB = await UnitTime.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(unitTimeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const getUnitTimesForPanel = async (req: Request, res: Response) => {
  try {
    const unitTimesDB = await UnitTime.find().countDocuments();
    
    const unitTimes = {
      id: String(new Date().getTime()),
      title: 'unidadesDeTiempo',
      total: unitTimesDB,
    };

    res.json(unitTimes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};
