import { Router } from 'express';
import { verifyAdmin } from '../middlewares/auth.middleware';
import { getAllCountries, getCountry, getCountriesForPanel, editCountryAdmin, deleteCountryAdmin } from '../controllers/country.controller';

const router = Router();

router.get('/getAllCountries', getAllCountries);
router.get('/getCountry/:id', getCountry);
router.get('/getCountriesForPanel', verifyAdmin, getCountriesForPanel);
router.put('/editCountryAdmin', verifyAdmin, editCountryAdmin);
router.delete('/deleteCountryAdmin', verifyAdmin, deleteCountryAdmin);

export default router;
