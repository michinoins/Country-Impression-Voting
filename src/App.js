import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountrySelect from './components/CountrySelect';
import AddImpression from './components/AddImpression';
import ImpressionList from './components/ImpressionsList';
import './App.css'; // Import the CSS file
import Header from './components/Header';


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
    <div className="App bg-gray-100 min-h-screen">
      <Header />
  
      <main className="container mx-auto py-10 px-4 main">
      <p className="description">
        Welcome to Country Impressions!<br/> Choose a country and share your first impression. <br/>Vote for others' impressions and see what people think!
      </p>
        <CountrySelect
          countries={countries}
          selectedCountryCode={selectedCountryCode}
          setSelectedCountryCode={setSelectedCountryCode}
        />
        <AddImpression countryCode={selectedCountryCode} />
        <ImpressionList countryCode={selectedCountryCode} />
      </main>
    </div>
  );
  
}

export default App;
