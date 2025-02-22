import { Button, Card, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';

const Header = (props) => {
  const { handleRequestSunData, requestErrors } = props;

  const [formData, setFormData] = useState({ location: '', startDate: '', endDate: '' }); // Inputs data
  const [formErrors, setFormErrors] = useState({ location: '', startDate: '' }); // Errors for inputs

  useEffect(() => {
    if (requestErrors == null) return;

    if (requestErrors.error == 'MISSING_PARAMETERS') inputsAreValid(); // This should never happen but the server return this validation so we should check it
    else if (requestErrors.error == 'INVALID_LOCATION')
      setFormErrors({ ...formErrors, location: 'Could not find this location' }); // If the backend could not find any matching location
    else if (requestErrors.error == 'INVALID_DATE') {
      if (!isValidDate(formData.startDate)) setFormErrors({ ...formErrors, startDate: 'Start date is invalid' });
      if (!isValidDate(formData.endDate)) setFormErrors({ ...formErrors, endDate: 'End date is invalid' });
    } else setFormErrors({ ...formErrors, generic: requestErrors.error });
  }, [requestErrors]);

  const handleSubmit = () => {
    if (inputsAreValid()) handleRequestSunData(formData.location, formData.startDate, formData.endDate);
  };

  const inputsAreValid = () => {
    const errors = {};

    // Input validation
    if (formData.location.trim().length == 0) errors.location = 'Location is required';
    if (formData.startDate.trim().length == 0) errors.startDate = 'Start date is required';

    setFormErrors(errors);

    // Return true if the inputs are valid
    return Object.entries(errors).length == 0;
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    const [year, month, day] = dateString.split('-').map(Number);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
  };

  return (
    <Card variant='elevation' elevation={2}>
      <Grid container spacing={2} padding={1} marginLeft={4} marginRight={4}>
        <Grid size={12}>
          <Typography variant='h5'>Search for sunrise/sunset</Typography>
        </Grid>

        <Grid size='grow'>
          <Typography variant='body1'>Location *</Typography>
          <TextField
            id='location-input'
            variant='outlined'
            size='small'
            error={formErrors.location}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <Typography variant='subtitle2' color='error'>
            {formErrors.location}
          </Typography>
        </Grid>

        <Grid size='grow'>
          <Typography variant='body1'>Start date *</Typography>
          <TextField
            id='start-date-input'
            type='date'
            variant='outlined'
            size='small'
            error={formErrors.startDate}
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
          <Typography variant='subtitle2' color='error'>
            {formErrors.startDate}
          </Typography>
        </Grid>

        <Grid size='grow'>
          <Typography variant='body1'>End date</Typography>
          <TextField
            id='end-date-input'
            type='date'
            variant='outlined'
            size='small'
            error={formData.endDate}
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
          <Typography variant='subtitle2' color='error'>
            {formErrors.endDate}
          </Typography>
        </Grid>

        <Grid container direction='column' justifyContent='flex-end' alignItems='flex-end' alignContent='end'>
          <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
          <Typography variant='subtitle2' color='error'>
            {formErrors.generic}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Header;
