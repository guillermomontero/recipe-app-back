import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import recipesRoutes from './routes/recipe';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', recipesRoutes);

export default app;