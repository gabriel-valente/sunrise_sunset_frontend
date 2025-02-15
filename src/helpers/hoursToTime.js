const hoursToTime = (decimalTime) => {
  if (decimalTime == null) return null
  // Calculate corresponding units
  const hours = Math.floor(decimalTime);
  const minutes = Math.floor((decimalTime - hours) * 60);
  const seconds = Math.round(((decimalTime - hours) * 60 - minutes) * 60);

  // Change hours past 12 to the 12 clock version
  const isPM = hours >= 12;
  const displayHours = hours % 12 == 0 ? 12 : hours % 12;

  return `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
};

export default hoursToTime;