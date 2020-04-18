const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const xml = require('xml');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 2020;
const covid19ImpactEstimator = require('../estimator');

app.get('/api/v1/on-covid-19', async (req, res) => res.sendStatus(200));
app.get('/api/v1/on-covid-19/:format', async (req, res) => {
  if (req.params.format === 'xml') {
    return res.sendStatus(200);
  }
  return res.sendStatus(200);
});
app.post('/api/v1/on-covid-19/:format', async (req, res) => {
  const data = req.body;
  const response = await covid19ImpactEstimator(data);
  if (req.params.format === 'xml') {
    res.type('application/xml');
    return res.send(xml(response));
  }
  return res.json(response);
});
app.get('/api/v1/on-covid-19/logs', (req, res) => res.send(`${app.use(morgan('dev'))}`));

app.listen(port, debug(`listening on port: ${port}`));
