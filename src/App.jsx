import React, { useState } from 'react';
import './App.css';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState('');

  const searchBtn = () => {
    var url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not Found Country');
        }
      })
      .then(data => {
        setCountryData(data[0]); // İlk sonuç ülke verisi
        setError(''); // Hata mesajını temizle
      })
      .catch(error => {
        setError(error.message); // Hata mesajını set eder
        setCountryData(null);
      });
  };

  return (
    <div>
      <div className='inputBtn'>
      <input
        type="text"
        value={countryName}
        onChange={e => setCountryName(e.target.value)}
        placeholder="Enter Country Name"
      />
      <button onClick={searchBtn}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajını göster */}
     

      {countryData && (
        <div>
          <h3>{countryData.name.common}</h3>
          <p>Capital City: {countryData.capital}</p>
          <p>Population: {countryData.population}</p>
          <p>Map: <a href={countryData.maps.googleMaps} target='_blank' rel="noopener noreferrer">{countryData.maps.googleMaps}</a></p>
          <p>Region : {countryData.region}</p>
          <p>Flag:</p>
          <img src={countryData.flags.png} alt={`${countryData.name.common} bayrağı`} />
        </div>
      )}
    </div>
  );
}

export default App;
