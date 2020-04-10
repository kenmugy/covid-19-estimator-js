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

const impact = ({ reportedCases, periodType, timeToElapse }) => {
  const currentlyInfected = reportedCases * 10;

  const infectionsByRequestedTime = periodEstimator(periodType, timeToElapse, currentlyInfected);
  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};
const severeImpact = ({ reportedCases, periodType, timeToElapse }) => {
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = periodEstimator(periodType, timeToElapse, currentlyInfected);
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
