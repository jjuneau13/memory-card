import { useState, useEffect } from "react";
import Card from "./components/card.jsx";
import "./App.css";

function randomizePokemon() {
  return [
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
    "charmander",
    "squirtle",
  ].sort(() => Math.random() - 0.5);
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [sprites, setSprites] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [pokemon, setPokemon] = useState(randomizePokemon());

  useEffect(() => {
    Promise.all(
      pokemon.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((result) => result.json())
          .then((result) => [name, result.sprites.front_default]),
      ),
    ).then((objects) => setSprites(Object.fromEntries(objects)));
  }, [pokemon]);

  function handleClick(name) {
    if (clicked.includes(name)) {
      setScore(0);
      setClicked([]);
    } else {
      setScore(score + 1);
      setClicked([...clicked, name]);
      if (score >= highScore) {
        setHighScore(highScore + 1);
      }
    }
    setPokemon(randomizePokemon());
  }

  return (
    <main>
      <header>
        <h1>Memory Game</h1>
        <div className="score">
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
      </header>

      <div className="card-div">
        {sprites &&
          pokemon.map((char) => (
            <Card
              key={char}
              name={char}
              url={sprites[char]}
              onClick={() => handleClick(char)}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
