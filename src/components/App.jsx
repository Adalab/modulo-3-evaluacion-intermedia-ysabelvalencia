import { useState, useEffect } from 'react';
import callToApi from '../services/api';
import localStorage from '../services/localStorage';
import '../styles/App.scss';
// import nombreVariable from '../images/nombre-imagen';



function App() {

  const [allCountries, setAllCountries] = useState([]);

  useEffect(()=> {
    fetch ("https://restcountries.com/v3.1/all?fields=name,capital,flag,continents")
    .then((response) => response.json())
    .then((data) => {

      setAllCountries(data)

      });

  }, []);

  const renderAllCountries = () => {
    return allCountries
    .map((eachCountry, i) =>
     (<li key={i}>
    
      <p>{eachCountry.flag}</p>
      <h3>{eachCountry.name.official}</h3>
      <p>{eachCountry.capital}</p>
      <p>{eachCountry.continents[0]}</p>
    </li>)
    )

  }


  return (
  <>
  <header>
    <h1>Country Info App</h1>
    <p>Explore information about countries, capitals, and flags. Add new countries and filter through the list!</p>
  </header>
  <main>
    <section>
      <form>
        <h2>Filters</h2>
        <div>
          <p>By country</p>
          <input type="text" />
          <p>By Continent</p>
          <select name="" id="">
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
          </select>
        </div>
      </form>
    </section>

    <section className='all-countries'>
      <ul className='all-countries-ul'>
       {renderAllCountries()}
      </ul>
    </section>
  </main>

  </>
    
  );
}

export default App;