import NavBar from './NavBar';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArtistPage from './ArtistPage';
import TrackPage from './TrackPage';
import AlbumPage from './AlbumPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> 
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/artist/:id">
              <ArtistPage />
            </Route>
            <Route path="/track/:id">
              <TrackPage />
            </Route>
            <Route path="/album/:id">
              <AlbumPage />
            </Route>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
