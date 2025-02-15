import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';
import timeToHours from '../../helpers/timeToHours';
import hoursToTime from '../../helpers/hoursToTime';

const SunChart = ({ sunData }) => {
  const [chartData, setChartData] = useState({});

  useMemo(() => {
    // Convert times to decimal
    let date = sunData.map((elem) => elem.date);
    let sunrise = sunData.map((elem) => timeToHours(elem.sunrise));
    let sunset = sunData.map((elem) => timeToHours(elem.sunset));
    let goldenHour = sunData.map((elem) => timeToHours(elem.golden_hour));

    // Filter data for special cases when we dont have information about the sunrise/sunset
    date = date.filter((_, index) => sunrise[index] && sunset[index] && sunrise[index] < sunset[index]);
    sunrise = sunrise.filter((_, index) => sunrise[index] && sunset[index] && sunrise[index] < sunset[index]);
    sunset = sunset.filter((_, index) => sunrise[index] && sunset[index] && sunrise[index] < sunset[index]);
    goldenHour = goldenHour.filter((_, index) => sunrise[index] && sunset[index] && sunrise[index] < sunset[index]);

    // Calculate daylight range (sunset - sunrise)
    const daylight = sunset.map((val, index) => val - sunrise[index]);

    setChartData({
      title: { text: 'Sunlight & Golden Hour Chart' },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return (
            `${params[0].name}<br/>` + // This is the date
            params.map((p) => `${p.marker} <b>${p.seriesName}:</b> ${hoursToTime(p.seriesName == 'Sunset' ? sunset[p.dataIndex] : p.value)}`).join('<br/>')
          );
        },
      },
      legend: { data: ['Sunrise', 'Sunset', 'Golden Hour'] },
      xAxis: { type: 'category', data: date },
      yAxis: {
        type: 'value',
        min: 0,
        max: 24,
        axisLabel: {
          formatter: (value) => {
            const hours = Math.floor(value);
            const minutes = Math.round((value - hours) * 60);
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
          },
        },
      },
      series: [
        {
          name: 'Sunrise',
          type: 'line',
          data: sunrise,
          stack: 'range',
          itemStyle: { color: '#FFEB3B' },
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0 },
          smooth: true,
        },
        {
          name: 'Sunset',
          type: 'line',
          data: daylight,
          stack: 'range',
          itemStyle: { color: '#2a2a47' },
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0.5, color: '#87ceeb' },
          smooth: true,
        },
        {
          name: 'Golden Hour',
          type: 'line',
          data: goldenHour,
          itemStyle: { color: '#ff7f32' },
          lineStyle: { width: 2 },
          smooth: true,
        },
      ],
    });
  }, [sunData]);

  return (
    <>
      <Paper elevation={8}>
        {sunData.some((item) => item.sunrise == null) && (
          <Typography align='center' paddingTop={2}>
            Not all data is shown. This location may not have a sunrise/sunset on some of the days.
          </Typography>
        )}
        <ReactECharts option={chartData} style={{ height: '800px', padding: '16px' }} />
      </Paper>
    </>
  );
};

export default SunChart;
