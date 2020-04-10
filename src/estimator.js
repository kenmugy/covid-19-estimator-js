class HelperEstimator {
  constructor({ periodType, timeToElapse, reportedCases }, impactFactor) {
    this.periodType = periodType;
    this.timeToElapse = timeToElapse;
    this.reportedCases = reportedCases;
    this.impactFactor = impactFactor;
  }

  computeDuration() {
    let period;
    switch (this.periodType) {
      case 'weeks':
        period = this.timeToElapse * 7;
        break;
      case 'months':
        period = this.timeToElapse * 30;
        break;
      default:
        period = this.timeToElapse;
    }
    return period;
  }

  powerFactor() {
    return Math.floor(this.computeDuration() / 3);
  }

  currentlyInfected() {
    return this.reportedCases * this.impactFactor;
  }

  infectionByRequestedTime() {
    const factor = this.powerFactor();
    return this.currentlyInfected() * 2 ** factor;
  }
}

const impactCases = (data) => {
  const infectionsByRequestedTime = new HelperEstimator(
    data,
    10
  ).infectionByRequestedTime();

  const currentlyInfected = new HelperEstimator(data, 10).currentlyInfected();

  return {
    infectionsByRequestedTime,
    currentlyInfected
  };
};

const severeImpactCases = (data) => {
  const infectionsByRequestedTime = new HelperEstimator(
    data,
    50
  ).infectionByRequestedTime();
  const currentlyInfected = new HelperEstimator(data, 50).currentlyInfected();
  return {
    infectionsByRequestedTime,
    currentlyInfected
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactCases,
  severeImpact: severeImpactCases
});

export default covid19ImpactEstimator;
