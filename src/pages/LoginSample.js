import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class LoginSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async e => {
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
          this.props.history.push("/signin/service_worker-profile"); // Go to service worker profile if "true".
        } else {
          console.log(`isServiceWorker: ${isServiceWorker}`);
          this.props.history.push("/signin/client-profile"); // Go to service worker profile if "false".
        }
      } else {
        console.log("From <LoginSample/>: login failed!");
      }
    }
  };

  //
  // Reads item values from session storage.
  readSessionStorage = () => {
    const id = sessionStorage.getItem("id");
    const isServiceWorker = sessionStorage.getItem("isServiceWorker");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    console.log(
      `id: ${id}, isServiceWorker: ${isServiceWorker}, isLoggedIn: ${isLoggedIn}`
    );
  };

  onLogout = () => {
    if (this.props.model.Logout) this.props.model.Logout();
    this.readSessionStorage();
  };

  render() {
    return (
      <div>
        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.handleInput}
                name="email"
                value={this.state.email}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleInput}
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button onClick={this.onSubmit} variant="primary" type="submit">
              Submit
            </Button>
            <br />
            <h2 className="mt-2">Test Buttons</h2>
            <Button onClick={this.readSessionStorage} variant="primary">
              From Session Storage
            </Button>
            <Button onClick={this.onLogout} className="ml-2">
              Logout Test
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default LoginSample;
