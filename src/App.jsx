import { useState } from 'react';
import Header from './components/header/header';
import SunDataPreview from './components/sunDataPreview/sunDataPreview';

import getSunData from './actions/getSunData';

function App() {
  const [sunData, setSunData] = useState([]); // This will have every data returned from the last request
  const [requestErrors, setRequestErrors] = useState(); // This will be passed to the Header so it can handle any errors returned by the backend

  const handleRequestSunData = (location, startDate, endDate) => {
    getSunData(location, startDate, endDate)
      .then((response) => setSunData(response))
      .catch((error) => setRequestErrors(error));
  };

  return (
    <>
      <Header handleRequestSunData={handleRequestSunData} requestErrors={requestErrors} />
      <SunDataPreview sunData={sunData} />
    </>
  );
}

export default App;
