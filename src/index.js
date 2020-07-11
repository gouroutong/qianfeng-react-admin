import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { mainRoutes } from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/admin" render={(routeProps) => <App {...routeProps} />} />
        {mainRoutes.map((route) => {
          return <Route key={route.path} {...route} />;
        })}
        <Redirect to="/admin" from="/" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
