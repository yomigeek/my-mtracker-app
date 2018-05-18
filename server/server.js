import 'babel-core/register';
import express from 'express';
import bodyParser from 'body-parser';
import appRoutes from './routes';

// Setting up the express app
const app = express();
const port = process.env.PORT || 5000;

// Ensures incoming data are parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Application routes
app.use('/api/v1/', appRoutes);

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to M-Tracker App',
  }));

app.listen(port, () => { console.log('server started'); });

export default app;
