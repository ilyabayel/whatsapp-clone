import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {store} from "./store/store";
import {App} from "./app";
import {Login} from "./pages/login/login";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app-root")
);
