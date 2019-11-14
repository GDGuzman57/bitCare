import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class TextAreaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Form.Group sm as={Col} controlId="formGridAboutMe">
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            name={this.props.name}
            value={this.props.aboutMe}
            onChange={this.props.onChange}
            as="textarea"
            type="text"
            placeholder={this.props.placeholder}
          />
        </Form.Group>
      </>
    );
  }
}

export default TextAreaForm;
