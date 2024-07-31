import numbers from "numbers";

import powerSJDropAnalysis from "./powerSJDropAnalysis";

const squatJumpAnalysis = (sJAccY = [], testTimeInput = 0, weight = 0) => {
  const evT = testTimeInput / 1000;
  const sJInterval = evT / sJAccY.length;

  const first50indexs = [];
  sJAccY.map((el, index) => {
    if (index < 50) {
      first50indexs.push(el);
    }
  });

  const initialMode = numbers.statistic.mode(sJAccY);
  const sJAccYY0 = sJAccY.map((el) => Number((el - initialMode) * 9.81));

  // busqueda del index 0
  const min = Math.min(...sJAccYY0);
  const minIndex = sJAccYY0.findIndex((el, index) => el === min);
  const arrayMenorMinIndex = [];

  sJAccYY0.map((el, index) => {
    if (index < minIndex) {
      arrayMenorMinIndex.push(el);
    }
  });
  const maxImpulso = Math.max(...arrayMenorMinIndex);

  const maxIndexImpulso = arrayMenorMinIndex.findIndex(
    (el) => el === maxImpulso
  );

  // buscamos que no tenga una parte negativa antes del impulso
  const maxIndexArray = [];
  arrayMenorMinIndex.map((el, index) => {
    if (index < maxIndexImpulso) {
      maxIndexArray.push(el);
    }
  });

  const minMaxIndexArray = Math.min(...maxIndexArray);

  // --------------------
  const index0 = arrayMenorMinIndex.findLastIndex(
    (el, index) => el < 0 && index < maxIndexImpulso
  );
  // fin index 0
  // ya tenemos el indice cero que es donde comienza la curva ascendente de la aceleración en el impulso

  const sJAccYY1 = [];
  sJAccYY0.map((el, index) => {
    if (index > index0) {
      sJAccYY1.push(el);
    }
  });

  // index1 donde finaliza el impulso y comienza el vuelo
  const index1 = sJAccYY1.findIndex((el) => el < 0);

  // index2 donde finaliza el vuelo
  const index2 = sJAccYY1.findIndex(
    (el, index) => el > 0 && index > index1 + 20
  );

  // construimos un array que contiene los elementos del vuelo y le restamos 3 intervalos de cada lado

  const array12 = [];
  sJAccYY0.map((el, index) => {
    if (index - 3 > index1 && index + 3 < index2) {
      array12.push(el);
    }
  });

  const flightTime = array12.length * sJInterval;
  const flightHeight = (1 / 8) * 9.81 * Math.pow(flightTime, 2);
  const takeoffSpeed = Math.sqrt(2 * 9.81 * flightHeight);

  // para graficar
  const finalMode = numbers.statistic.mode(sJAccYY1);

  const sJAccYFinal = [];
  const xAxis = [];
  sJAccYY1.map((el) => {
    if (el > 0.1 || el < -0.1) {
      sJAccYFinal.push(el);
      xAxis.push(0);
    }
  });

  // ----------------------reverse

  // construimos el array de impulso

  const arrayY3 = [];
  const arrayY3T = [];
  let county3T = 0;
  sJAccYY1.map((el, index) => {
    if (index < index1) {
      arrayY3.push(el);
      arrayY3T.push((county3T += sJInterval));
    }
  });

  const arrayY3Invertido = [...arrayY3].reverse();

  // calculamos la velocidad máxima como el 100 por ciento de la de despegue
  const velMax = (100 * takeoffSpeed) / 95;

  // como la velocidad es maxima, la aceleración debe ser cero, entonces integramos hacia atras la aceleración partiendo como valor incial de velocidad la máxima
  const integralArray = [];
  let countDP = velMax;
  for (let i = 0; i < arrayY3Invertido.length - 1; i++) {
    countDP -=
      ((Number(arrayY3Invertido[i]) + Number(arrayY3Invertido[i + 1])) *
        (arrayY3T[i + 1] - arrayY3T[i])) /
      2;
    integralArray.push(countDP);
  }
  // del array de velocidad filtramos los positivos y para saber al length donde la velocidad es cero que corresponde al punto mas bajo de la trayectoria

  const arrayY3InvertidoPositivo = integralArray.filter((el) => el > 0);
  integralArray.reverse();

  // ahora tenemos un array de velocidad que va de cero a la maxima. nos falta saber que intervalo de tiempo existe entre este punto y la velocidad de despegue, que seria el punto donde la asceleración es monor a -5 m/s". le sumamos por tanteo 4 intervalos de tiempo

  // para obtener la distancia sumamos la superficie

  // a. del triangulo cuya base es el intervalo de tiempo desde la posición mas baja hasta la velocidad máxima

  const propulsiveMaxTime = Number(
    (arrayY3InvertidoPositivo.length * sJInterval).toFixed(2)
  );
  const propulsiveMaxDist = (propulsiveMaxTime * velMax) / 2;

  // b. el paralelepipedo de base 4 intervalos de tiempo agregados, un lado es la vemax y el otro la v de despegue. aplicamos regla del trapecio

  const sumaVel = velMax + takeoffSpeed;
  const intervalo = sJInterval * 3;
  const propulsiveDespDist = (sumaVel * intervalo) / 2;

  // sumamos

  const propulsiveDistanceSJ = (propulsiveMaxDist + propulsiveDespDist).toFixed(
    2
  );

  // el tiempo propulsivo seria

  const propulsiveTimeSJ = (
    intervalo +
    arrayY3InvertidoPositivo.length * sJInterval
  ).toFixed(2);

  // {----------------------------------------------------}

  const { powerSJ, fRMSJ } = powerSJDropAnalysis(
    weight,
    flightTime,
    propulsiveMaxTime,
    flightHeight
  );

  // ---------------------------- metodo de samosino

  const mg = weight * 9.81;
  const hs = flightHeight / propulsiveDistanceSJ;
  const sqrt = Math.sqrt((9.81 * flightHeight) / 2);

  const potencia = mg * (hs + 1) * sqrt;

  const fuerza = potencia / sqrt;

  // ----------------------------
  const validationSJ =
    index0 !== -1 &&
    index1 !== -1 &&
    index2 !== -1 &&
    index1 < index2 &&
    minMaxIndexArray > -1 &&
    sJAccYFinal.length !== 0 &&
    takeoffSpeed > 1;

  const sJDataObj = {
    sJAccYFinal,
    xAxis,
    flightTime,
    flightHeight,
    takeoffSpeed,
    sJInterval,
    powerSJ,
    fRMSJ,
    propulsiveTimeSJ,
    propulsiveDistanceSJ,
    validationSJ,
  };

  return {
    sJDataObj,
  };
};
export default squatJumpAnalysis;
