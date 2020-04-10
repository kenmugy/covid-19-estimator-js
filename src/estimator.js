const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

  const periodEstimator = (period, currentlyInfected, time) => {
    switch (period) {
      case 'weeks':
        return currentlyInfected * Math.trunc((time * 7) / 3);
      case 'months':
        return currentlyInfected * Math.trunc((time * 30) / 3);
      default:
        return currentlyInfected * Math.trunc(time / 3);
    }
  };
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
