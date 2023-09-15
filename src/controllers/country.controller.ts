import { Request, Response } from "express";
import Country from "../models/country.model";

export const getAllCountries = async (req: Request, res: Response) => {
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

export const getCountry = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const countryDB = await Country.find({ _id });
    res.json(countryDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const getCountriesForPanel = async (req: Request, res: Response) => {
  try {
    const countriesDB = await Country.find().countDocuments();
    
    const countries = {
      id: String(new Date().getTime()),
      title: 'paises',
      page: 'admin-countries',
      total: countriesDB,
      showChart: false,
      order: 3,
    };

    res.json(countries);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};