import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "0fdff4a5";
  const APP_KEY = "4dae1d23fa176682255bd3ec591e402b";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState();
const [query, setQuery]= useState('chicken');
  //every function should have a return value
  //const [counter,setCounter] = useState(0);
  useEffect(() => {
    getRecipes();
    //console.log("effct has been added");
  }, [query]);
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits);

  };
  const updateSearch = e  => { 
    setSearch(e.target.value);
    console.log(search)
  }
  console.log(search);
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  //the array function is used to ensure that the request is only made once
  //<h1 onClick={()=> setCounter(counter+1)}>{counter}</h1> bellow form
  return (
    <div className="App">
      <form  onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch } />
       
        <button className="search-button" type="submit">Search </button>
      </form>
<div className="recipes"> 
      {recipes.map(recipe => (
<div className="rcp">
        <Recipe
        key={recipe.recipe.label}
       
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients} />
        </div>
     ))}
     </div>
     </div>
   

  );
};
export default App;
