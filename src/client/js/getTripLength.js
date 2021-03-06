const getTripLength = (departure, arrival) => {
  const tripLengthSeconds = arrival.getTime() - departure.getTime();
  const tripLengthDays = tripLengthSeconds / (1000 * 3600 * 24);

  return tripLengthDays;
};

export { getTripLength };
