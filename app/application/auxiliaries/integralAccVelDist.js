const integralAccVelDist = (arrayA, interval) => {
  const arrayT = [];
  let countT = 0;
  arrayA.map((el) => arrayT.push((countT += interval)));

  const vel = [];
  let countVel = 0;
  for (let i = 0; i < arrayA.length - 1; i++) {
    countVel +=
      ((Number(arrayA[i]) + Number(arrayA[i + 1])) *
        (arrayT[i + 1] - arrayT[i])) /
      2;

    vel.push(countVel);
  }

  const distance = [];
  let countDist = 0;

  for (let i = 0; i < vel.length - 1; i++) {
    countDist +=
      ((Number(vel[i]) + Number(vel[i + 1])) * (arrayT[i + 1] - arrayT[i])) / 2;
    distance.push(countDist);
  }

  return { vel, distance, countDist };
};
export default integralAccVelDist;
