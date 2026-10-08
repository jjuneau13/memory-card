import { useState, useEffect } from "react";
import Card from "./components/Card.jsx";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [sprites, setSprites] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [pokemon, setPokemon] = useState([
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
  ]);

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
    console.log(name);
    if (clicked.find(name)) {
      setScore(0);
      setClicked([]);
    } else {
      setScore(score + 1);
      setClicked([...clicked].push(name));
    }
    if (score > highScore) {
      setHighScore(score);
    }
    setPokemon([...pokemon].sort(() => Math.random() - 0.5));
  }

  return (
    <main>
      <h1>Memory Game</h1>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      {sprites &&
        pokemon.map((char) => (
          <Card
            key={char}
            name={char}
            url={sprites[char]}
            callbackFunc={() => handleClick(char)}
          />
        ))}
    </main>
  );
}

export default App;
