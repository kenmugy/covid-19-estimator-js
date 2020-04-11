import covid19ImpactEstimator from './estimator';

function getFromForm() {
  const population = +document.querySelector('[data-population]').value;

  const timeToElapse = +document.querySelector('[data-time-to-elapse]')
    .value;
  const reportedCases = +document.querySelector('[data-reported-cases]')
    .value;
  const totalHospitalBeds = +document.querySelector(
    '[data-total-hospital-beds]'
  ).value;

  const periodType = document.querySelector('[data-period-type]').value;
  const button = document.querySelector('[data-go-estimate]');

  const inputData = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  button.addEventListener('click', (e) => {
    e.preventDefault();
    covid19ImpactEstimator(inputData);
  });
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  getFromForm();
});
