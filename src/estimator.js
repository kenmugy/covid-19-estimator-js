function periodEstimator(period, time, current) {
  switch (period) {
    case 'weeks':
      return current * 2 ** Math.trunc((time * 7) / 3);
    case 'months':
      return current * 2 ** Math.trunc((time * 30) / 3);
    default:
      return current * 2 ** Math.trunc(time / 3);
  }
}

function beds(totalHospitalBeds) {
  return totalHospitalBeds * 0.35;
}

function dollarEstimator(period, time) {
  switch (period) {
    case 'weeks':
      return time * 7;
    case 'months':
      return time * 30;
    default:
      return time;
  }
}

const impact = ({
  reportedCases, periodType, timeToElapse, totalHospitalBeds, region
}) => {
  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = periodEstimator(periodType, timeToElapse, currentlyInfected);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(beds(totalHospitalBeds)
  - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime
          * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD)
          / dollarEstimator(periodType, timeToElapse));
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};
const severeImpact = ({
  reportedCases, periodType, timeToElapse, totalHospitalBeds, region
}) => {
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = periodEstimator(periodType, timeToElapse, currentlyInfected);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc(beds(totalHospitalBeds)
  - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime
          * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD)
          / dollarEstimator(periodType, timeToElapse));
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impact(data),
  severeImpact: severeImpact(data)
});

function getFromForm() {
  const population = +document.querySelector('[data-population]').value;

  const timeToElapse = +document.querySelector('[data-time-to-elapse]').value;
  const reportedCases = +document.querySelector('[data-reported-cases]').value;
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

document.addEventListener('click', getFromForm);
export default covid19ImpactEstimator;
