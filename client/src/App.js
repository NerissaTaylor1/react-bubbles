import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import ColorList from "./components/ColorList";
import "./styles.scss";

function App() {
  return (
    <Router>

      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <ul><li><Link to="/login">Login</Link></li>
          <li><Link to="protected">BubblePage</Link></li></ul>
        <Switch>
          <PrivateRoute path="/protected" component={BubblePage} />
          <Route exact path="/protected" component={BubblePage} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={ColorList} />
          <Route path="/colors/:id" render={props => {
            return <ColorList {...props} />
          }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
