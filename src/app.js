import covid19ImpactEstimator from './estimator.js';

const button = document.querySelector('[data-go-estimate]');

button.addEventListener('click', (e) => {
  e.preventDefault();
  covid19ImpactEstimator(inputData);
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  getFromForm();
});
