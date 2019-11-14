import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpServiceWorkerForm from "./pages/SignUp/ServiceWorkerForm";
import Paths from "./pages/SignUp/Paths";
import SignUpClientForm from "./pages/SignUp/ClientForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("cdm: from App");
  }

  onSubmit = (a, b, c) => {
    console.log("Start time: " + b + "\nEnd time: " + c + "\nOn: " + a);
  };

  render() {
    console.log("render: From App");
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/signup"
              render={props => <Paths {...props} />}
            />
            <Route
              exact
              path="/signup/service_worker"
              render={props => <SignUpServiceWorkerForm {...props} />}
            />
            <Route
              exact
              path="/signup/client"
              render={props => <SignUpClientForm {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
