import { useEffect, useState } from 'react';
import './sunPositionVisualizer.css';

const SunPositionVisualizer = (props) => {
  const { sunrise, sunset, goldenHour } = props;
  // These variables are to position the visualisation elements
  const [sunrisePercentage, setSunrisePercentage] = useState(0); // Start of light bar
  const [sunsetPercentage, setSunsetPercentage] = useState(0); // End/Width of light bar
  const [goldenHourPercentage, setGoldenHourPercentage] = useState(0); // Position of yellow circle

  useEffect(() => {
    setSunrisePercentage(timeToPercentage(sunrise));
    setSunsetPercentage(timeToPercentage(sunset));
    setGoldenHourPercentage(timeToPercentage(goldenHour));
  }, [props]);

  const timeToPercentage = (time) => {
    // Split the time into their units
    const [hour, minute, second] = time
      .replace(/(AM|PM)/, '')
      .split(':')
      .map(Number);
    const period = time.slice(-2).toUpperCase(); // AM/PM

    if (hour == 12) hour = 0;
    const hours24 = period == 'AM' ? hour : hour + 12;

    // Get the time in hours (30 mins = 0.5 hours), (36 secs = 0.01 hours)
    const timeToHours = hours24 + minute / 60 + second / 3600;

    return (timeToHours / 24) * 100; // Calculate the percentage
  };

  return (
    <>
      <div className='viewer-bar'>
        <div
          className='day-bar'
          style={{
            left: `${sunrisePercentage}%`,
            width: `calc(${sunsetPercentage}% - ${sunrisePercentage}%)`,
          }}></div>
        <div
          className='golden-hour'
          style={{
            left: `calc(${goldenHourPercentage}% - ${sunsetPercentage}% + ${sunrisePercentage}%)`,
          }}></div>
      </div>
    </>
  );
};

export default SunPositionVisualizer;
