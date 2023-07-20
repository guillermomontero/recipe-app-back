import { Request, Response } from 'express';
import UnitType from '../models/unit-type.model';
import _ from 'underscore';

export const getAllUnitTypes = async (req: Request, res: Response) => {
  try {
    const unitTypesDB = await UnitType.find();
    
    res.send(unitTypesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const createUnitType = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const unitTypeDB = new UnitType(payload);
    await unitTypeDB.save();
    
    res.json(unitTypeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const deleteUnitType = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await UnitType.findByIdAndDelete({ _id });
    const unitTypesDB = await UnitType.find();

    res.json(unitTypesDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};

export const editUnitType = async (req: Request, res: Response) => {
  const _id = req.body._id;
  // Through Underscore we choose which fields can be modified
  const body = _.pick(req.body, [
    'name',
  ]);

  try {
    const unitTypeDB = await UnitType.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

    res.json(unitTypeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    })
  }
};
