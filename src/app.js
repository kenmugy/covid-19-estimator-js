// const express = require('express');
// const debug = require('debug')('app');
// const morgan = require('morgan');
// const xml = require('xml');

// const app = express();

// const covid19ImpactEstimator = require('./estimator')

// app.get('env') === 'development' && app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // app.use(middlefunc);

// const PORT = process.env.PORT || '4400';
// // const logs = [];

// app.post('/api/v1/on-covid-19/:format', (req, res) => {
//   if (req.params.format === 'xml' && req.body) {
//     // app.set('Content-Type', 'application/xml');
//     res.type('application/xml');
//     return res.send(xml(covid19ImpactEstimator(req.body)));
//   }

//   if (req.params.format === 'json' || !req.params.format) {
//     return req.body && res.json(covid19ImpactEstimator(req.body));
//   }
// });

// app.listen(PORT, debug(`listening on port ${PORT}`));
