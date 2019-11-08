import React, { Component } from "react";
import ButtonGroup from "./components/DaysButtonGroup";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <ButtonGroup />
      </div>
    );
  }
}

export default App;
