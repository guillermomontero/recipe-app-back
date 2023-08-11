import 'dotenv/config';
import path from 'path';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import recipesRoutes from './routes/recipe.route';
import usersRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import categoriesRoutes from './routes/category.route';
import temperaturesCategoriesRoutes from './routes/temperature-category.route';
import countriesRoutes from './routes/country.route';
import unitTimes from './routes/unit-time.route';
import weightTypes from './routes/weight-type.route';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for Vue.js router modo history
import history from 'connect-history-api-fallback';
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/recipes', recipesRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/temperatureCategories', temperaturesCategoriesRoutes);
app.use('/api/v1/countries', countriesRoutes);
app.use('/api/v1/unitTimes', unitTimes);
app.use('/api/v1/weightTypes', weightTypes);

export default app;