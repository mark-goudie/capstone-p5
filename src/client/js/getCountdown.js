const getCountdown = (arrival) => {
  const differenceInDays = new Date(arrival) - new Date();
  let days = new Date(differenceInDays) / (24 * 3600 * 1000);
  days = Number(Math.round(days));
  return days;
};

export { getCountdown };
