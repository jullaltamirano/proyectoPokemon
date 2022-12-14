import { Route } from 'react-router-dom'
import 'redux';
import './App.css';
import LandingPage from './components/landing_page/landing_page';
import Nav from './components/nav/nav';
import Home from './components/home/home';
import PokemonDetail from './components/pokemon_detail/pokemon_detail';
import PokemonCreate from './components/pokemon_create/pokemon_create';

function App() {


  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Route path='/pokemon'>
        <Nav />
      </Route>      
      <Route exact path='/pokemon'>
        <Home />
      </Route>
      <Route path='/pokemon/:id'>
        <PokemonDetail />
      </Route>
      <Route path='/create'>
        <PokemonCreate />
      </Route>
    </div>
  );
}

export default App;
