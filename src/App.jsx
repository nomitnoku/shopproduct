import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter
      className="App"
    >
      <Switch>
        <Route
          path="/cart"
          component={Cart}
        />
        <Route
          path="/"
          component={Products}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
