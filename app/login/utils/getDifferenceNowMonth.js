import { miliseconds } from "./miliseconds";

const getDifferenceNowMonth = (initialDate) => {
  const initialDateMiliseconsds = new Date(initialDate).getTime();
  const today = Date.now();
  const diasDesdeInicio = parseInt(
    (today - initialDateMiliseconsds) / miliseconds.day
  );
  return diasDesdeInicio;
};

export default getDifferenceNowMonth;
