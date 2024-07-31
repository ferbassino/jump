const powerCMJDropAnalysis = (weight, tV, tP, alturaVuelo) => {
  // fuerza media
  const fM = (weight * 9.81 * tV) / (tP * 2);
  const fRM = parseInt(fM + weight * 9.81);
  // haltura propulsiva

  const dividendo = fRM / (weight * 9.81) - 1;

  const hP = alturaVuelo / dividendo;

  const power = parseInt((weight * 9.81 * (alturaVuelo + hP)) / tP);

  return { power, fRM };
};
export default powerCMJDropAnalysis;
