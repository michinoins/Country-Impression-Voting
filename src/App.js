import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountrySelect from './components/CountrySelect';
import AddImpression from './components/AddImpression';
import ImpressionList from './components/ImpressionsList';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <h1>Country Impressions</h1>
      <CountrySelect
        countries={countries}
        selectedCountryCode={selectedCountryCode}
        setSelectedCountryCode={setSelectedCountryCode}
      />
      <AddImpression countryCode={selectedCountryCode} />
      <ImpressionList countryCode={selectedCountryCode} />
    </div>
  );
}

export default App;
