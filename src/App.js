import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router-dom";
import DetailPokemon from "./components/DetailPokemon";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PokemonList />} />
        <Route path="pokemon">
          <Route path=":pokemonId" element={<DetailPokemon />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
