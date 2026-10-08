import { useState, useEffect } from "react";
import Card from "./components/card.jsx";

const pokemon = [
  "ditto",
  "pikachu",
  "raichu",
  "lickitung",
  "bulbasaur",
  "charizard",
  "snivy",
  "chimchar",
  "venusaur",
  "zapdos",
];

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [sprites, setSprites] = useState(null);
  const tempPokemon = [...pokemon];
  useEffect(() => {
    Promise.all(
      pokemon.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((result) => result.json())
          .then((result) => [name, result.sprites.front_default]),
      ),
    ).then((objects) => setSprites(Object.fromEntries(objects)));
  }, []);
  return (
    <>
      <h1>Memory Game</h1>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      {sprites &&
        pokemon.map((char) => <Card name={char} url={sprites[char]} />)}
    </>
  );
}

function randomizePokemon() {
  pokemon;
}

export default App;
