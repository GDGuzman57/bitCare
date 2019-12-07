import React, { Component } from "react";

import AvailabilityTableRow from "./TableRow";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

class AvailabilityTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <Table responsive striped hover size="sm">
          <thead>
            <tr>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <AvailabilityTableRow
              list={this.props.list}
              handleDelete={this.props.handleDelete}
            />
          </tbody>
        </Table>
      </Container>
    );
  }
}
export default AvailabilityTable;
