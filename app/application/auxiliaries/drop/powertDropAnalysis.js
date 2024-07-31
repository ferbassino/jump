const powerDropAnalysis = (
  weight,
  flightHeight2,
  takeoffSpeed2,
  contactTime
) => {
  const propHeight = (contactTime / 2) * (takeoffSpeed2 / 2);
  const propTime = contactTime / 2;
  const powerDJ = parseInt(
    (weight * 9.81 * (flightHeight2 + propHeight)) / propTime
  );

  const work = weight * 9.81 * (flightHeight2 + propHeight);
  const meanForce = parseInt(work / propHeight);

  return { propHeight, propTime, powerDJ, meanForce };
};
export default powerDropAnalysis;
