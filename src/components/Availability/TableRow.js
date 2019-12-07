import React, { Component } from "react";

class AvailabilityTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteRow = e => {
    console.log(e.currentTarget.getAttribute("id"));

    //
    //
    if (this.props.handleDelete)
      this.props.handleDelete(e.currentTarget.getAttribute("id"));
  };

  tableRows = () => {
    if (this.props.list) {
      let row = this.props.list().map((availabilityObj, index) => (
        <tr onClick={this.deleteRow} key={index} id={availabilityObj.blockId}>
          <td>{availabilityObj.day}</td>
          <td>{availabilityObj.start}</td>
          <td>{availabilityObj.end}</td>
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
