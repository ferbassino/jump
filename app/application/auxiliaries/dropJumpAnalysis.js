import numbers from "numbers";
import powerCMJDropAnalysis from "./powerCMJDropAnalysis";
import powerDropAnalysis from "./drop/powertDropAnalysis";

const dropJumpAnalysis = (accY = [], testTimeInput = 0, weight = 0) => {
  const evT = testTimeInput / 1000;
  const interv = evT / accY.length;

  const accYG = accY.map((el) => el * 9.81);
  const mode = numbers.statistic.mode(accYG);
  const dropJumpAccY = accY.map((el) => Number((el * 9.81 - mode).toFixed(4)));
  const initialMode = numbers.statistic.mode(dropJumpAccY);

  // el primer valor menor a -8
  const refIndex = dropJumpAccY.findIndex((el) => el < -8);
  // index0 donde comienza la primera caida
  const index0 = dropJumpAccY.findLastIndex(
    (el, index) => el > initialMode && index < refIndex
  );
  // para la validación buscamos si existe impulso con un valor mayor a 1,5 m/s2

  const validateIndex = dropJumpAccY.findIndex(
    (el, index) => el > 3 && index < refIndex
  );

  // toda la curva desde el index0
  const dropJumpAccY0 = [];
  dropJumpAccY.map((el, index) => {
    if (index > index0) {
      dropJumpAccY0.push(el);
    }
  });

  // index1 donde comienza el primer impulso
  const index1 = dropJumpAccY0.findIndex((el, index) => el > initialMode);
  // index01 es donde comenzaria la caida, en el drop la primera caida comienza con poca pendiente, determinamos que empieza en -8
  const index01 = dropJumpAccY0.findIndex(
    (el, index) => el < -8 && index < index1
  );

  // creamos un arreglo de la primera caida para restarle el tiempo de 3 intervalos finales

  const arrayFlightOne = [];
  dropJumpAccY0.map((el, index) => {
    if (index >= index01 && index + 3 < index1) {
      arrayFlightOne.push(el);
    }
  });

  // primera caida
  const flightTime1 = arrayFlightOne.length * interv;
  const flightHeight1 = (1 / 2) * 9.81 * Math.pow(flightTime1, 2);

  const dropSpeed = Math.sqrt(2 * 9.81 * flightHeight1);

  // segunda fase aerea
  // index2 es donde comienza la segunda fase de vuelo
  const index2 = dropJumpAccY0.findIndex(
    (el, index) => el < initialMode && index > index1
  );
  // tiempo de contacto

  const contactTime = (index2 + 2 - (index1 + 2)) * interv;
  const index3 = dropJumpAccY0.findIndex(
    (el, index) => el > initialMode && index > index2
  );

  // creamos el array de la segunda fase aerea
  const arrayFlightTwo = [];
  dropJumpAccY0.map((el, index) => {
    if (index - 3 > index2 && index + 3 < index3) {
      arrayFlightTwo.push(el);
    }
  });

  const flightTime2 = arrayFlightTwo.length * interv;
  const flightHeight2 = (1 / 8) * 9.81 * Math.pow(flightTime2, 2);
  const takeoffSpeed2 = Math.sqrt(2 * 9.81 * flightHeight2);

  const { propHeight, propTime, powerDJ, meanForce } = powerDropAnalysis(
    weight,
    flightHeight2,
    takeoffSpeed2,
    contactTime
  );
  const fRMDJ = meanForce;

  const DJinterv = interv;
  const propulsiveTimeDJ = propTime.toFixed(2);
  const propulsiveDistanceDJ = propHeight.toFixed(2);

  // {----------------------------------------------------}

  // para graficar
  const index4 = dropJumpAccY0.findIndex(
    (el, index) => el < initialMode && index > index3
  );
  const index5 = dropJumpAccY0.findIndex(
    (el, index) => el > initialMode && index > index4
  );

  const dropJumpAccY0F = [];
  const dropJumpXAxis = [];
  dropJumpAccY0.map((el, index) => {
    if (index <= index5) {
      dropJumpAccY0F.push(el);
      dropJumpXAxis.push(0);
    }
  });

  const validationDJ =
    index1 !== -1 &&
    index2 !== -1 &&
    index3 !== -1 &&
    index4 !== -1 &&
    index5 !== -1 &&
    index1 < index2 &&
    index2 < index3 &&
    index3 < index4 &&
    index4 < index5 &&
    validateIndex === -1 &&
    dropJumpAccY0F.length !== 0;

  const dJDataObject = {
    dropJumpAccY0F,
    dropJumpXAxis,
    interv,
    flightTime1,
    flightHeight1,
    dropSpeed,
    contactTime,
    flightTime2,
    flightHeight2,
    takeoffSpeed2,
    DJinterv,
    powerDJ,
    fRMDJ,
    propulsiveTimeDJ,
    propulsiveDistanceDJ,
    validationDJ,
  };

  return dJDataObject;
};
export default dropJumpAnalysis;
