import { Request, Response } from "express";
import _ from 'underscore';
import Country from "../models/country.model";

export class CountryController {
  static getAllCountries = async (req: Request, res: Response) => {
    try {
      const countriesDB = await Country.find();
      
      res.send(countriesDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static getCountry = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const countryDB = await Country.find({ _id });
      res.json(countryDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static getCountriesForPanel = async (req: Request, res: Response) => {
    try {
      const countriesDB = await Country.find().countDocuments();
      
      const countries = {
        id: String(new Date().getTime()),
        title: 'paises',
        page: 'admin-countries',
        total: countriesDB,
        showChart: false,
        order: 4,
      };
  
      res.json(countries);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static editCountryAdmin = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'name',
    ]);
  
    try {
      const countryDB = await Country.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
  
      res.json(countryDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static deleteCountryAdmin = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      await Country.findByIdAndDelete({ _id });
  
      res.json({ msg: 'Country remove successfully'});
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
};

export default CountryController;
