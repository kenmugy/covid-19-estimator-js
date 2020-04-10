function periodEstimator(period, time) {
  let Perrio;
  switch (period) {
    case 'weeks':
      Perrio = Math.trunc((time * 7) / 3);
      break;
    case 'months':
      Perrio = Math.trunc((time * 30) / 3);
      break;
    default:
      Perrio = Math.trunc((time) / 3);
  }
  return Perrio;
}

const impact = ({ reportedCases, periodType, timeToElapse }) => {
  const currentlyInfected = reportedCases * 10;

  const infectionsByRequestedTime = currentlyInfected
  * 2 ** periodEstimator(periodType, timeToElapse);
  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};
const severeImpact = ({ reportedCases, periodType, timeToElapse }) => {
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected
  * 2 ** periodEstimator(periodType, timeToElapse);
  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact,
  severeImpact
});

export default covid19ImpactEstimator;
