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
          * dollarEstimator(periodType, timeToElapse));
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
          * dollarEstimator(periodType, timeToElapse));
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

export default covid19ImpactEstimator;
