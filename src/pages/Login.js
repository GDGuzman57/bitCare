import React, { Component } from "react";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleInput = e => {
    if (!this.props.model.ExpressionIsNotSafe(e.target.value))
      this.setState({ [e.target.name]: e.target.value });
  }

  onLogout = () => {
    if (this.props.model.Logout) this.props.model.Logout();
  };

  onLogin = async e => {
    e.preventDefault();

    // First checks if the CB functions, Login, is not null.
    if (this.props.model.Login) {
      const isUser = await this.props.model.Login(
        this.state.email,
        this.state.password
      );

      if (isUser) {
        console.log("From <LoginSample/>: login success!");

        // Variable to store "isServiceWorker" string value.
        const isServiceWorker = sessionStorage.getItem("isServiceWorker");

        // Checks if the session storage item, "isServiceWorker", has a stringified boolean value.
        // Session storage (or web storages in general) can only store strings. If you're using a boolean value
        // from a web storage that hasn't been stringified then the condition will check for if value is is not null instead
        // of true or false.
        if (isServiceWorker === "true") {
          console.log(`isServiceWorker: ${isServiceWorker}`);
          this.props.history.push("/profile/service_worker"); // Go to service worker profile if "true".
        } else {
          console.log(`isServiceWorker: ${isServiceWorker}`);
          this.props.history.push("/profile/client"); // Go to service worker profile if "false".
        }
      } else {
        console.log("From <LoginSample/>: login failed!");
      }
    }
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              onChange={this.handleInput}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={this.handleInput}
            />
          </div>
          <div className="input-field">
            <button
              className="btn blue lighten-1 z-depth-0"
              onClick={this.onLogin}
            >
              Login
            </button>
          </div>
          <div>
            <h3>Test buttons</h3>
            <button
              className="btn blue lighten-1 z-depth-0"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default SignIn;
