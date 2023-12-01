import { Router } from 'express';
import { verifyAdmin } from '../middlewares/auth.middleware';
import CountryController from '../controllers/country.controller';

const router = Router();

router.get('/getAllCountries', CountryController.getAllCountries);
router.get('/getCountry/:id', CountryController.getCountry);
router.get('/getCountriesForPanel', verifyAdmin, CountryController.getCountriesForPanel);
router.put('/editCountryAdmin', verifyAdmin, CountryController.editCountryAdmin);
router.delete('/deleteCountryAdmin', verifyAdmin, CountryController.deleteCountryAdmin);

export default router;
