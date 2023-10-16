import { useState, useEffect } from 'react';
import '../styles/App.scss';
// import nombreVariable from '../images/nombre-imagen';



function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectSearch, setSelectSearch] = useState("");

  useEffect(()=> {
    fetch ("https://restcountries.com/v3.1/all?fields=name,capital,flag,continents")
    .then((response) => response.json())
    .then((data) => {

      setAllCountries(data)

      });

  }, []);
  
  const renderAllCountries = () => {
    return allCountries
    .filter ((eachCountry)=>
    eachCountry.name.official.toLowerCase().includes(inputSearch.toLowerCase()))

    .filter((eachCountry) => {
      if (selectSearch === "All") {
        return true;
      }else {
        return eachCountry.continents[0] === selectSearch;
      }
    })
    //este filter funciona pero elimina el renderizado y la funcionalidad del input by country. Lo dejo en commit pero no lo subiré al deploy

    
    .map((eachCountry, i) =>
     (<li key={i}>
    
      <p>{eachCountry.flag}</p>
      <h3>{eachCountry.name.official}</h3>
      <p>{eachCountry.capital}</p>
      <p>{eachCountry.continents[0]}</p>
    </li>)
    )

  }

  const handleForm = (ev) => {
    ev.preventDefault()
  }

  const handleInputSearch = (ev) => {
    setInputSearch(ev.target.value)

  }
  const handleSelectSearch = (ev) => {
    setSelectSearch(ev.target.value);
  };



  return (
  <>
  <header>
    <h1>Country Info App</h1>
    <p>Explore information about countries, capitals, and flags. Add new countries and filter through the list!</p>
  </header>
  <main>
    <section>
      <form onSubmit={handleForm}>
        <h2>Filters</h2>
        <div>
          <p>By country</p>
          <input 
          type='search'
          name='country'
          value={inputSearch}
          id='country'
          onChange={handleInputSearch} 
          />
          <p>By Continent</p>
          <select 
          name="select" 
          id="select"
          value={selectSearch}
          onChange={handleSelectSearch}

          >
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