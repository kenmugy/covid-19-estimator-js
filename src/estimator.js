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
  impact: impact(data),
  severeImpact: severeImpact(data)
});

export default covid19ImpactEstimator;
