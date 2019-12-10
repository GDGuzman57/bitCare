import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";

const styles = theme => ({
  button: {
    marginTop: 20
  },
  input: {
    marginTop: 15
  },
  card: {
    maxWidth: "50%"
  },
  container: {
    marginTop: 100
  }
});

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleInput = e => this.setState({ [e.target.name]: e.target.value });

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
    //
    // Needed for Material-UI styling
    const { classes } = this.props;

    return (
      <Container align="center" className={classes.container}>
        <Card className={classes.card}>
          <CardContent align="center">
            <FormControl onSubmit={this.handleSubmit} className="white">
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="email"
                onChange={this.handleInput}
                className={classes.input}
              />
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="password"
                onChange={this.handleInput}
                className={classes.input}
              />
              <Button
                variant="contained"
                onClick={this.onLogin}
                color="primary"
                className={classes.button}
              >
                Login
              </Button>
              <div>
                <h3>Test buttons</h3>
                <Button className={classes.button} onClick={this.onLogout}>
                  Logout
                </Button>
              </div>
            </FormControl>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
