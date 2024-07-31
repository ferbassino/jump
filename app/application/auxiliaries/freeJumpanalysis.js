import numbers from "numbers";

const freeJumpAnalysis = (freeAccY = [], testTimeInput = 0, weight = 0) => {
  const evT = testTimeInput / 1000;
  const interval = evT / freeAccY.length;

  const modo = numbers.statistic.mode(freeAccY);
  const freeArrayY0 = freeAccY.map((el) => el - modo);
  const freeArrayY1 = [];

  const freeXAxis = [];
  freeArrayY0.map((el) => {
    if (el > 0.02 || el < -0.02) {
      freeArrayY1.push(el);
      freeXAxis.push(0);
    }
  });
  const freeValidated = freeArrayY1.length !== 0 && freeXAxis.length !== 0;

  return { freeArrayY1, freeXAxis, freeValidated };
};
export default freeJumpAnalysis;
