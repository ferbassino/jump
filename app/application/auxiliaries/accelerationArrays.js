const accelerationArrays = (accData = [], testTimeInput = 0) => {
  const accX = [];
  const accY = [];
  const accZ = [];
  const arrayAccTime = [];
  let count = 0;
  accData.map((el) => {
    accX.push(el.x);
    accY.push(el.y);
    accZ.push(el.z);
    count += testTimeInput / accData.length;
    arrayAccTime.push(count / 1000);
  });

  return {
    accX,
    accY,
    accZ,
    arrayAccTime,
  };
};

export default accelerationArrays;
