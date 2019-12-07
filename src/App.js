import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpClientForm from "./pages/SignUp/ClientForm";
import { HomePage } from "./pages/homePage";
import ListServiceWorkers from "./pages/ListServiceWorkers";
import LoginSample from "./pages/LoginSample";

// Pages to render when signing up.
import SignUpServiceWorkerForm from "./pages/SignUp/ServiceWorkerForm";
import Paths from "./pages/SignUp/Paths";

// Pages to render when signed in.
import { ServiceWorkerProfile } from "./pages/SignedIn/ServiceWorkerProfile";
import { ClientProfile } from "./pages/SignedIn/ClientProfile";
import { ServiceWorkerEditProfile } from "./pages/SignedIn/ServiceWorkerEditProfile";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = (a, b, c) => {
    console.log("Start time: " + b + "\nEnd time: " + c + "\nOn: " + a);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            model={this.props.model}
            render={props => <HomePage {...props} />}
          />
          <Route
            exact
            path="/signup"
            model={this.props.model}
            render={props => <Paths {...props} />}
          />
          <Route
            exact
            path="/signin"
            render={props => (
              <LoginSample model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/signup/service_worker"
            render={props => (
              <SignUpServiceWorkerForm model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/signup/client"
            render={props => (
              <SignUpClientForm model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/signin/service_worker-profile"
            render={props => (
              <ServiceWorkerProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/signin/service_worker-profile/edit"
            render={props => (
              <ServiceWorkerEditProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/signin/client-profile"
            render={props => (
              <ClientProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/list"
            render={props => (
              <ListServiceWorkers model={this.props.model} {...props} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
