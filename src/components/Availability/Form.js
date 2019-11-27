import React, { Component } from "react";

import AvailabilityTable from "./Table";

import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

/*
TODO:
*/

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: "",
      startTime: "08:00:00",
      endTime: "10:00:00"
    };
  }

  componentDidMount() {
    console.log("cdm: from AvailabilityForm");
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
    console.log(e.target.value);
    this.setState({ day: e.target.value });

    // console.log("BUTTON TOGGLED! ", this.state.day);
  };

  onSubmit = e => {
    e.preventDefault();

    const { day, startTime, endTime } = this.state;

    const isInvalid = startTime !== "" && endTime !== "" && day !== "";

    if (this.props.handleSubmit) {
      if (isInvalid) {
        this.props.handleSubmit([
          {
            day: day,
            startTime: startTime,
            endTime: endTime
          }
        ]);
      }
    } else if (this.props.onGetBlock) {
      const block = {
        day: this.state.day,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      };

      this.props.onGetBlock(block);
    }

    console.log("ADD BUTTON CLICKED");
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
        <ButtonGroup toggle className="mr-2 mt-1">
          <ToggleButton
            name="day"
            variant="primary"
            key={index}
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
    console.log("render: from AvailabilityForm", this.state);
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
                  name="startTime"
                  onChange={this.onChange}
                  className="form-control"
                  type="time"
                  value={this.state.startTime}
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
                  name="endTime"
                  onChange={this.onChange}
                  className="form-control"
                  type="time"
                  value={this.state.endTime}
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
          {this.props.includeTable ? (
            <Form.Row>
              <Col>
                <AvailabilityTable list={this.getList} />
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
