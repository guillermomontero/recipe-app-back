import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config'

import recipesRoutes from './routes/recipe';
import usersRoutes from './routes/user';
import categoriesRoutes from './routes/category';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', recipesRoutes);
app.use('/api', usersRoutes);

export default app;