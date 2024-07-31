import numbers from "numbers";

const stiffnessAnalysis = (accY = [], testTimeInput = 0, weight = 0) => {
  const modo = numbers.statistic.mode(accY);
  const arrayY0 = accY.map((el) => el - modo);
  const interval = testTimeInput / accY.length / 1000;
  let count = 0;
  const arrayAccTime = [];
  accY.map((el) => {
    count += testTimeInput / accY.length;
    arrayAccTime.push(count / 1000);
  });

  const arrayYCentral = [];
  const timeArrayYCentral = [];
  arrayY0.map((el, index) => {
    if (arrayAccTime[index] > 3 && arrayAccTime[index] < 10) {
      arrayYCentral.push(el);
      timeArrayYCentral.push(arrayAccTime[index]);
    }
  });
  const arrayYCentral0 = [];
  const arrayYCentral0F = [];

  let indexI = 0;
  let index0I = 0;
  arrayYCentral.map((el, index) => {
    if (arrayYCentral[0] > 0) {
      index0I = arrayYCentral.findIndex((el) => el < 0);
      if (index0I <= index) arrayYCentral0.push(el);
    }
    if (arrayYCentral[0] < 0) {
      indexI = arrayYCentral.findIndex((el) => el > 0);
    }
  });
  const stiffnessXAxis = [];
  arrayYCentral.map((el, index) => {
    if (index > indexI) {
      arrayYCentral0F.push(el);
      stiffnessXAxis.push(0);
    }
  });

  index0I = arrayYCentral0F.findIndex((el, index) => el < 0);

  arrayYCentral0F.map((el, index) => {
    if (index > index0I) {
      arrayYCentral0.push(el);
    }
  });
  const index0 = 0;
  let index1 = 0;
  let index2 = 0;
  let index3 = 0;
  let index4 = 0;
  let index5 = 0;
  let index6 = 0;
  let index7 = 0;
  let index8 = 0;
  let index9 = 0;
  let index10 = 0;
  let index11 = 0;
  let index12 = 0;

  arrayYCentral0.map((el, index) => {
    index1 = arrayYCentral0.findIndex((el) => el > 0);
    index2 = arrayYCentral0.findIndex((el, index) => index > index1 && el < 0);
    index3 = arrayYCentral0.findIndex((el, index) => index > index2 && el > 0);
    index4 = arrayYCentral0.findIndex((el, index) => index > index3 && el < 0);
    index5 = arrayYCentral0.findIndex((el, index) => index > index4 && el > 0);
    index6 = arrayYCentral0.findIndex((el, index) => index > index5 && el < 0);
    index7 = arrayYCentral0.findIndex((el, index) => index > index6 && el > 0);
    index8 = arrayYCentral0.findIndex((el, index) => index > index7 && el < 0);
    index9 = arrayYCentral0.findIndex((el, index) => index > index8 && el > 0);
    index10 = arrayYCentral0.findIndex((el, index) => index > index9 && el < 0);

    index11 = arrayYCentral0.findIndex(
      (el, index) => index > index10 && el > 0
    );
    index12 = arrayYCentral0.findIndex(
      (el, index) => index > index11 && el < 0
    );
  });

  const tV01 = (index1 - index0) * interval;
  const tC12 = (index2 - index1) * interval;

  const tV23 = (index3 - index2) * interval;
  const tC34 = (index4 - index3) * interval;

  const tV45 = (index5 - index4) * interval;
  const tC56 = (index6 - index5) * interval;

  const tV67 = (index7 - index6) * interval;
  const tC78 = (index8 - index7) * interval;

  const tV89 = (index9 - index8) * interval;
  const tC910 = (index10 - index9) * interval;

  const tV1011 = (index11 - index10) * interval;
  const tC1112 = (index12 - index11) * interval;

  const tC = (tC34 + tC56 + tC78 + tC910 + tC1112) / 5;
  const tV = (tV23 + tV45 + tV67 + tV89 + tV1011) / 5;

  const frequency = 1 / (tC + tV);

  const a = weight * Math.PI * (tV + tC);
  const b = Math.pow(tC, 2);
  const c = (tC + tV) / Math.PI;
  const d = tC / 4;

  const stiffness = parseInt(a / (b * (c + d)));

  const stiffnessData = {
    tC34,
    tC56,
    tC78,
    tC910,
    tC1112,
    tV23,
    tV45,
    tV67,
    tV89,
    tV1011,
    stiffness,
    frequency,
  };

  const indexValidation =
    index0 < index1 &&
    index1 < index2 &&
    index2 < index3 &&
    index3 < index4 &&
    index4 < index5 &&
    index5 < index6 &&
    index6 < index7 &&
    index7 < index8 &&
    index8 < index9 &&
    index9 < index10 &&
    index10 < index11 &&
    index11 < index12 &&
    frequency < 4 &&
    frequency > 1 &&
    tC34 < 0.6 &&
    tC56 < 0.6 &&
    tC78 < 0.6 &&
    tC910 < 0.6 &&
    tC1112 < 0.6 &&
    tC34 > 0.1 &&
    tC56 > 0.1 &&
    tC78 > 0.1 &&
    tC910 > 0.1 &&
    tC1112 > 0.1 &&
    tV23 < 1 &&
    tV45 < 1 &&
    tV67 < 1 &&
    tV89 < 1 &&
    tV1011 < 1 &&
    tV23 > 0.1 &&
    tV45 > 0.1 &&
    tV67 > 0.1 &&
    tV89 > 0.1 &&
    tV1011 > 0.1 &&
    arrayYCentral0F.length !== 0;

  return {
    stiffnessData,
    arrayYCentral,
    arrayYCentral0F,
    stiffnessXAxis,
    arrayYCentral0,
    accY,
    arrayAccTime,
    indexValidation,
  };
};

export default stiffnessAnalysis;
