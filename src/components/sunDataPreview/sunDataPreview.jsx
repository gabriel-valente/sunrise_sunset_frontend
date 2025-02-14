import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SunPositionVisualizer from '../sunPositionVisualizer/sunPositionVisualizer';

const SunDataPreview = (props) => {
  const { sunData } = props;

  const formatTime = (time) => {
    const [hours, minutes, _seconds] = time.split(':');

    // time.slice(-2) = Gets only the AM/PM part
    return `${hours}:${minutes} ${time.slice(-2)}`;
  };

  return (
    <>
      {sunData[0] != null && (
        <Grid container spacing={2} margin={4}>
          <Grid size={12}>
            <Typography variant='h3'>{sunData[0].location}</Typography>
          </Grid>
          {sunData.map((data, index) => (
            <Grid key={index} size={12}>
              <Paper elevation={8}>
                <Grid container size={12} padding={3}>
                  <Grid size={12}>
                    <Typography variant='body1'>Date</Typography>
                    <Typography variant='h5'>{data.date}</Typography>
                  </Grid>
                  {data.sunrise == null || data.golden_hour == null || data.sunset == null ? (
                    <>
                      <Grid size={4}></Grid>
                    </>
                  ) : (
                    <>
                      <Grid size={4}>
                        <Typography variant='body1'>Sunrise</Typography>
                        <Typography variant='h5'>{formatTime(data.sunrise)}</Typography>
                      </Grid>
                      <Grid size={4}>
                        <Typography variant='body1' align='center'>
                          Golden hour
                        </Typography>
                        <Typography variant='h5' align='center'>
                          {formatTime(data.golden_hour)}
                        </Typography>
                      </Grid>
                      <Grid size={4}>
                        <Typography variant='body1' align='right'>
                          Sunset
                        </Typography>
                        <Typography variant='h5' align='right'>
                          {formatTime(data.sunset)}
                        </Typography>
                      </Grid>
                      <Grid size={12}>
                        <SunPositionVisualizer sunrise={data.sunrise} sunset={data.sunset} goldenHour={data.golden_hour} />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default SunDataPreview;
