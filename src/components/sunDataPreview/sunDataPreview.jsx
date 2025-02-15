import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SunTable from '../sunTable/sunTable';
import SunChart from '../sunChart/sunChart';

const SunDataPreview = (props) => {
  const { sunData } = props;

  return (
    <>
      {sunData[0] != null && (
        <Grid container spacing={2} margin={4}>
          <Grid size={12}>
            <Typography variant='h3'>{sunData[0].location}</Typography>
          </Grid>

          <Grid size={12}>
            <SunTable sunData={sunData} />
          </Grid>

          <Grid size={12}>
            <SunChart sunData={sunData} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SunDataPreview;
