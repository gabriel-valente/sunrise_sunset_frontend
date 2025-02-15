const timeToHours = (time) => {
  if (time == null) return null;
  // Split the time into their units
  const [hour, minute, second] = time
    .replace(/(AM|PM)/, '')
    .split(':')
    .map(Number);
  const period = time.slice(-2).toUpperCase(); // AM/PM

  const hours24 = period === 'AM' ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12;

  // Get the time in hours (30 mins = 0.5 hours), (36 secs = 0.01 hours)
  return hours24 + minute / 60 + second / 3600;
};

export default timeToHours;