import React, { Component } from "react";

class AvailabilityTableRow extends Component {

  tableRows = () => {
    if (this.props.list) {
      let row = this.props.list().map((availabilityObj, index) => (
        <tr key={index}>
          <td>{availabilityObj.day}</td>
          <td>{availabilityObj.startTime}</td>
          <td>{availabilityObj.endTime}</td>
        </tr>
      ));
      return row;
    }
  };

  render() {
    return <>{this.tableRows()}</>;
  }
}
export default AvailabilityTableRow;
