import { useEffect, useState } from 'react';
import countriesService from './services/countries.js';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const filteredCountries = countries.filter((country) => {
    const {
      name: { common }
    } = country;
    return common.toLowerCase().includes(searchValue.toLowerCase());
  });

  const showCountry = (country) => {
    setSearchValue(country);
  };

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries));
  }, []);

  return (
    <main>
      <div>
        <label htmlFor='search'>
          Find countries{' '}
          <input
            type='search'
            name='search'
            id='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
      </div>
      <div>
        {countries && searchValue ? (
          <>
            {searchValue && filteredCountries.length > 10 ? (
              <p>Too many matches, specify filter</p>
            ) : filteredCountries.length > 1 ? (
              <article>
                {filteredCountries.map((country) => {
                  const {
                    name: { common }
                  } = country;
                  return (
                    <div key={common}>
                      <span>{common}</span>{' '}
                      <button onClick={() => showCountry(common)}>Show</button>
                    </div>
                  );
                })}
              </article>
            ) : filteredCountries.length === 1 ? (
              <article>
                {(({ name: { common }, capital, area, flags, languages }) => (
                  <>
                    <h3>{common}</h3>
                    <p>Capital: {capital}</p>
                    <p>Area: {area} km²</p>
                    <p>
                      <strong>Languages:</strong>{' '}
                    </p>
                    <ul>
                      {Object.values(languages).map((language) => (
                        <li key={language}>{language}</li>
                      ))}
                    </ul>
                    <img src={flags.png} alt={`Flag of ${common}`} />
                  </>
                ))(filteredCountries[0])}
              </article>
            ) : searchValue ? (
              <p>No country matches</p>
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
};

export default App;
