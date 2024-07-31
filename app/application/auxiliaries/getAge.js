export const getAge = (date) => {
  const birthDay = new Date(date);
  const age = parseInt((Date.now() - birthDay) * (3.2 * Math.pow(10, -11)));

  return age;
};
