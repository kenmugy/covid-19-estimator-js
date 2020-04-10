const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

  const periodEstimator = (period, currentlyInfected, time) => {
    switch (period) {
      case 'weeks':
        return currentlyInfected * time * 2 ** 2;
      case 'months':
        return currentlyInfected * time * 2 ** 10;
      default:
        return currentlyInfected * time;
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
