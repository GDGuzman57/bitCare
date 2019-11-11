import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

/*
TODO:
- reset toggles after submitting
- add color to Container border
*/

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
      startTime: "08:00:00",
      endTime: "12:00:00"
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(e.target.value);
  };

  onChecked = e => {
    let isChecked = e.target.value;
    this.setState({ days: this.state.days.concat(isChecked) });
  };

  onSubmit = e => {
    e.preventDefault();
    const { days, startTime, endTime } = this.state;
    let isChecked = e.target.value;

    if (isChecked !== "") {
      this.setState({
        days: this.state.days.concat(isChecked) // FIXME: adds duplicate days when untoggling then toggling.
      });
    }

    if (this.props.handleSubmit) {
      if (startTime !== "" && endTime !== "" && days.length > 0) {
        this.props.handleSubmit(days, startTime, endTime);
        console.log(this.state);
      }
    }
  };

  toggleButtons = () => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];

    const checkboxes = days.map((item, index) => {
      return (
        <ToggleButton
          key={index}
          type="checkbox"
          value={item}
          onChange={this.onChecked}
          size="sm"
          checked="checked"
        >
          {item.slice(0, 3)}
        </ToggleButton>
      );
    });

    return checkboxes;
  };

  timeOptions = () => {
    let time = [<option>{""}</option>];
    for (let i = 1; i <= 12; i++) {
      time.push(<option>{i + ":00"}</option>);

      for (let j = i; j <= i; j++) {
        time.push(<option>{j + ":30"}</option>);
      }
    }

    return time;
  };

  render() {
    return (
      <>
        <Container className="availability-form">
          <Form>
            <Form.Row>
              <Col md={{ span: 4, offset: 4 }}>
                <ToggleButtonGroup type="checkbox">
                  {this.toggleButtons()}
                </ToggleButtonGroup>
              </Col>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} sm="2.5" md={{ span: 3, offset: 4 }}>
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

              <Form.Group as={Col} sm="2.5" md={{ span: 3, offset: 4 }}>
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
            <Form.Row className="mt-2">
              <Col md={{ span: 4, offset: 4 }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.onSubmit}
                  size="sm"
                >
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </>
    );
  }
}

export default AvailabilityForm;
