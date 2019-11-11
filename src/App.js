import React, { Component } from "react";
import AvailabilityForm from "./components/AvailabilityForm";

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
      <div>
        <AvailabilityForm handleSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
