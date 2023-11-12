import React, { use, useState } from "react";
import "./pokemonGridm.css";

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

export default function PokemonGrid(props) {
  const { handleSelectPokemon, url } = props;
  const [search, setSearch] = useState("");

  let data;

  if (localStorage.getItem("pokemon-cards")) {
    data = JSON.parse(localStorage.getItem("pokemon-cards"));
  } else {
    console.log("FETHCED FROM API");
    data = use(fetchData(url));
    localStorage.setItem("pokemon-cards", JSON.stringify(data));
  }

  return (
    <div className="pokemonGrid">
      <h1 className="header">My Pokemon</h1>
      <div className="listContainer">
        <input
          type="text"
          value={search}
          placeholder="Search Pokemon"
          onChange={(e) => setSearch(e.target.value)}
        />
        {data.results
          .filter(val => {
            return val.name.includes(search)
          }).map((pokemon, pokemonIndex) => {
            return (
              <div
                onClick={handleSelectPokemon(pokemon.name)}
                key={pokemonIndex}
                className="pokemon">
                {pokemon.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}
