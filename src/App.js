import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginForm from "./LoginForm";
import { logout } from "./services/Authentication";
import ProtectedRoute from "./utils/ProtectedRoute";

function App(props) {
  return (
    <Router history={createBrowserHistory}>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={() => (
            <div>
              Hello Dashboard
              <button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        />
        <Route path="/login" component={() => <LoginForm type="login" />} />
        <Route
          path="/register"
          component={() => <LoginForm type="register" />}
        />
      </Switch>
    </Router>
  );
}

App.propTypes = {};

export default App;
