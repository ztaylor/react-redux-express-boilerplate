import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AnotherPage from './components/AnotherPage';
import NotFound from './components/NotFound';
import reducers from './reducers'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const App = () => (
  <Provider store={store}>

    <Home/>
    
    {/*
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/another_page" component={AnotherPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router> */}


  </Provider>
);

export default App;
