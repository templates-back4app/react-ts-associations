import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BookList } from './BookList';
import { ObjectCreationForm } from './ObjectCreationForm';
import { BookCreationForm } from './BookCreationForm';
const Parse = require('parse/dist/parse.min.js');

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'YOUR_PARSE_APPLICATION_ID';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'YOUR_PARSE_JAVASCRIPT_KEY';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/create-object/:objectType">
            <ObjectCreationForm />
          </Route>
          <Route path="/create-book">
            <BookCreationForm />
          </Route>
          <Route path="/">
            <BookList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
