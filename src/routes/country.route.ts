import { Router } from 'express';
import { getAllCountries, getCountry } from '../controllers/country.controller';

const router = Router();

router.get('/getAllCountries', getAllCountries);
router.get('/getCountry/:id', getCountry);

export default router;
