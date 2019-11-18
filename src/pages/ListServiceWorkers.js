import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class ListServiceWorkers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  listUsers = async () => {
    const emails = await this.props.model.ListUsers();
    console.log(emails);
  };

  createUser = () => {
    if (this.props.model.CreateUser) this.props.model.CreateUser();
  };

  render() {
    return (
      <>
        <h1>OPEN YOUR CONSOLE!</h1>
        <Button onClick={this.props.model.GetFromAwsBucket}>
          List Workers
        </Button>
      </>
    );
  }
}

export default ListServiceWorkers;
