import covid19ImpactEstimator from './estimator';

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// middleware
const middlefunc = (req, res, next) => {
  res.send(`${req.get('host')}${req.originalUrl}`);
  next();
};

app.use(middlefunc);

const PORT = process.env.PORT || '4400';
const logs = [];

app.get('/api/v1/on-covid-19/logs', (req, res) => {

});
app.post(
  '/api/v1/on-covid-19/:format',
  (req, res) => {
    if (req.params.format === 'xml') return null; // xml fromat
    res.json(covid19ImpactEstimator(req.body));
  }
);

app.listen(PORT, console.log(`listening on port ${PORT}`));
