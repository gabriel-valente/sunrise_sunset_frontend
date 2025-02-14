const getSunData = (location, startDate, endDate) => {
  const endDateUrl = endDate != '' ? '&end_date=' + endDate : '';

  return fetch('http://localhost:3000/sun_data?location=' + location + '&start_date=' + startDate + endDateUrl)
    .then((response) => {
      if (!response.ok) return response.json().then(err => Promise.reject(err));

      return response.json();
    })
};

export default getSunData;