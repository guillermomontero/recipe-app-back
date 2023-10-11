import { Router } from 'express';
import { verifyAdmin } from '../middlewares/auth.middleware';
import {
  getAllCountries,
  getCountry,
  editCountryAdmin,
  deleteCountryAdmin,
  getCountriesForPanel } from '../controllers/country.controller';

const router = Router();

router.get('/getAllCountries', getAllCountries);
router.get('/getCountry/:id', getCountry);
router.put('/editCountryAdmin', verifyAdmin, editCountryAdmin);
router.delete('/deleteCountryAdmin', verifyAdmin, deleteCountryAdmin);
router.get('/getCountriesForPanel', verifyAdmin, getCountriesForPanel);

export default router;
