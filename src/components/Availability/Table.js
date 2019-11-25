import React, { Component } from "react";

import AvailabilityTableRow from "./TableRow";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

class AvailabilityTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // getList = () => {
  //   if (this.props.list) {
  //     return this.props.list();
  //   }
  // };

  componentDidMount() {
    console.log("cdm: from AvailabilityTable");
  }

  render() {
    console.log("render: from AvailabilityTable");
    console.log("render: from AvailabilityTable", this.props.list());
    return (
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Day</th>
              <th>Start time</th>
              <th>End time</th>
            </tr>
          </thead>
          <tbody>
            <AvailabilityTableRow list={this.props.list} />
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default AvailabilityTable;