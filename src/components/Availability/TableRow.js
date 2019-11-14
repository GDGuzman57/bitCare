import React, { Component } from "react";

class AvailabilityTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("cdm: from AvailabilityTableRow");
  }

  tableRows = () => {
    if (this.props.list) {
      let row = this.props.list().map(availabilityObj => (
        <tr>
          <td>{availabilityObj.day}</td>
          <td>{availabilityObj.startTime}</td>
          <td>{availabilityObj.endTime}</td>
        </tr>
      ));

      return row;
    }
  };

  render() {
    console.log("render: from AvailabilityTableRow ", this.props.list());

    return <>{this.tableRows()}</>;
  }
}

export default AvailabilityTableRow;
