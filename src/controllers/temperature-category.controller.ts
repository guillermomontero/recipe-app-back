import { Request, Response } from 'express';
import TemperatureCategory from '../models/temperature-category.model';
import _ from 'underscore';

export class TemperatureCategoryController {
  static getAllTemperatureCategories = async (req: Request, res: Response) => {
    try {
      const temperatureCategoriesDB = await TemperatureCategory.find();
      
      res.send(temperatureCategoriesDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static createTemperatureCategory = async (req: Request, res: Response) => {
    const payload = req.body;
  
    try {
      const temperatureCategoryDB = new TemperatureCategory(payload);
      await temperatureCategoryDB.save();
      
      res.json(temperatureCategoryDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static getTemperatureCategory = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const temperatureCategoryDB = await TemperatureCategory.find({ _id });
      res.json(temperatureCategoryDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static deleteTemperatureCategoryAdmin = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      await TemperatureCategory.findByIdAndDelete({ _id });
      const temperatureCategoriesDB = await TemperatureCategory.find();
  
      res.json(temperatureCategoriesDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static editTemperatureCategoryAdmin = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'name',
    ]);
  
    try {
      const temperatureCategoryDB = await TemperatureCategory.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
  
      res.json(temperatureCategoryDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static getTemperatureCategoriesForPanel = async (req: Request, res: Response) => {
    try {
      const temperatureCategoriesDB = await TemperatureCategory.find().countDocuments();
      
      const temperatureCategories = {
        id: String(new Date().getTime()),
        title: 'categoriasDeTemperatura',
        page: 'admin-temperature-categories',
        total: temperatureCategoriesDB,
        showChart: false,
        order: 5,
      };
  
      res.json(temperatureCategories);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
};

export default TemperatureCategoryController;
