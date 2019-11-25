import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class ListServiceWorkers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
