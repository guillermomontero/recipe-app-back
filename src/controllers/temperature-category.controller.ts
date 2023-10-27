import { Request, Response } from 'express';
import _ from 'underscore';
import TemperatureCategory from '../models/temperature-category.model';

export const getAllTemperatureCategories = async (req: Request, res: Response) => {
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

export const getTemperatureCategory = async (req: Request, res: Response) => {
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

export const createTemperatureCategory = async (req: Request, res: Response) => {
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

export const editTemperatureCategoryAdmin = async (req: Request, res: Response) => {
  const _id = req.body._id;
  const body = _.pick(req.body, ['name']);

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

export const deleteTemperatureCategoryAdmin = async (req: Request, res: Response) => {
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

export const getTemperatureCategoriesForPanel = async (req: Request, res: Response) => {
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
