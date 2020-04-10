function periodEstimator(period, time) {
  switch (period) {
    case 'weeks':
      return Math.trunc((time * 7) / 3);
    case 'months':
      return Math.trunc((time * 30) / 3);
    default:
      return Math.trunc(time / 3);
  }
}

const impactResults = ({ reportedCases, periodType, timeToElapse }) => {
  const currentlyInfected = reportedCases * 10;

  const infectionsByRequestedTime = currentlyInfected
  * 2 ** periodEstimator(periodType, timeToElapse);
  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};
const severeResults = ({ reportedCases, periodType, timeToElapse }) => {
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
  impact: impactResults,
  severeImpact: severeResults
});

export default covid19ImpactEstimator;
