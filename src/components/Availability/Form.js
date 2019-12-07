import React, { Component } from "react";

import uuid from "uuid"; // Generates a seemingly random id. Used for user sign ups.

import AvailabilityTable from "./Table";

import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: "",
      start: "08:00:00",
      end: "10:00:00"
    };
  }

  getList = () => {
    if (this.props.list) {
      return this.props.list();
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClickDay = e => {
    this.setState({ day: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { day, start, end } = this.state;

    const isInvalid = start !== "" && end !== "" && day !== "";

    if (this.props.handleSubmit) {
      if (isInvalid) {
        this.props.handleSubmit([
          {
            blockId: uuid(),
            day: day,
            start: start,
            end: end
          }
        ]);
      }
    } else if (this.props.onGetBlock) {
      const block = {
        blockId: uuid(),
        day: this.state.day,
        start: this.state.start,
        end: this.state.end
      };

      this.props.onGetBlock(block);
    }
  };

  toggleButtons = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const checkboxes = days.map((item, index) => {
      return (
        <ButtonGroup key={index} toggle className="mr-2 mt-1">
          <ToggleButton
            name="day"
            variant="primary"
            value={item}
            type="radio"
            onClick={this.onClickDay}
            as={Col}
          >
            {item.slice(0, 3)}
          </ToggleButton>
        </ButtonGroup>
      );
    });

    return checkboxes;
  };

  render() {
    return (
      <>
        <Container className="border border-dark w-100 rounded-sm mt-4">
          <Form.Row>
            <Form.Group sm lg="8" as={Col}>
              {this.toggleButtons()}
            </Form.Group>
          </Form.Row>

          <Form.Row className="mt-3">
            <Form.Group sm lg="6" as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    From
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  name="start"
                  onChange={this.onChange}
                  className="form-control"
                  type="time"
                  value={this.state.start}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group sm lg="6" as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    To
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  name="end"
                  onChange={this.onChange}
                  className="form-control"
                  type="time"
                  value={this.state.end}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row className="mt-1 mb-1">
            <Col>
              <Button
                variant="success"
                type="submit"
                onClick={this.onSubmit}
                size="sm"
                className="mb-2 float-right"
              >
                {this.props.buttonText}
              </Button>
            </Col>
          </Form.Row>
          {// Renders a table if "true" was passed to the prop "includeTable".
          this.props.includeTable ? (
            <Form.Row>
              <Col>
                <AvailabilityTable
                  list={this.getList}
                  handleDelete={this.props.handleDelete}
                />
              </Col>
            </Form.Row>
          ) : (
            <br />
          )}
        </Container>
      </>
    );
  }
}

export default AvailabilityForm;
