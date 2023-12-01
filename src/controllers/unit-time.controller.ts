import { Request, Response } from 'express';
import UnitTime from '../models/unit-time.model';
import _ from 'underscore';

export class UnitTimeController {
  static getAllUnitTimes = async (req: Request, res: Response) => {
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
  
  static getUnitTime = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const unitTimeDB = await UnitTime.find({ _id });
      res.json(unitTimeDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static createUnitTime = async (req: Request, res: Response) => {
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
  
  static deleteUnitTimeAdmin = async (req: Request, res: Response) => {
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
  
  static editUnitTimeAdmin = async (req: Request, res: Response) => {
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
  
  static getUnitTimesForPanel = async (req: Request, res: Response) => {
    try {
      const unitTimesDB = await UnitTime.find().countDocuments();
      
      const unitTimes = {
        id: String(new Date().getTime()),
        title: 'unidadesDeTiempo',
        page: 'admin-unit-times',
        total: unitTimesDB,
        showChart: false,
        order: 6,
      };
  
      res.json(unitTimes);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
};

export default UnitTimeController;
