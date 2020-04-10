const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

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
  return {
    data,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime() {
        return this.currentlyInfected * 2 ** periodEstimator();
      }
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime() {
        return this.currentlyInfected * 2 ** periodEstimator();
      }
    }
  };
};
export default covid19ImpactEstimator;
