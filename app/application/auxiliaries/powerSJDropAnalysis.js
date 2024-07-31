const powerSJDropAnalysis = (weight, tV, tP, alturaVuelo) => {
  // fuerza media
  const fM = (weight * 9.81 * tV) / (tP * 2);
  const fRMSJ = parseInt(fM + weight * 9.81);
  // haltura propulsiva

  const dividendo = fRMSJ / (weight * 9.81) - 1;

  const hP = alturaVuelo / dividendo;

  const powerSJ = parseInt((weight * 9.81 * (alturaVuelo + hP)) / tP);

  return { powerSJ, fRMSJ };
};
export default powerSJDropAnalysis;
