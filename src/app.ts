import 'dotenv/config'

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import recipesRoutes from './routes/recipe.route';
import usersRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import categoriesRoutes from './routes/category.route';
import temperaturesCategoriesRoutes from './routes/temperature-category.route';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/recipes', recipesRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/temperatureCategories', temperaturesCategoriesRoutes);

export default app;