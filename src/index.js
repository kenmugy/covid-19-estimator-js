import covid19ImpactEstimator from './estimator';
import { button, getFromForm } from './form';
import '../css/main.css';

button.addEventListener('click', (e) => {
  e.preventDefault();
  covid19ImpactEstimator(getFromForm());
});
