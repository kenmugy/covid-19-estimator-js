const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

  function periodEstimator(period, currentlyInfected, time) {
    if (period === 'weeks') {
      return currentlyInfected * Math.trunc((time * 7) / 3);
    }
    if (period === 'months') {
      return currentlyInfected * Math.trunc((time * 30) / 3);
    }
    if (period === 'days') {
      return currentlyInfected * Math.trunc(time / 3);
    }
    return 0;
  }
  return {
    data,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime() {
        return periodEstimator(
          periodType,
          this.currentlyInfected,
          timeToElapse
        );
      }
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime() {
        return periodEstimator(
          periodType,
          this.currentlyInfected,
          timeToElapse
        );
      }
    }
  };
};
export default covid19ImpactEstimator;
