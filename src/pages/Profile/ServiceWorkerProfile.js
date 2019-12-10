import React, { Component } from "react";

import Button from "react-bootstrap/Button";

import { TimeTable } from "../../components/TimeTable";

export class ServiceWorkerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      availability: []
    };
  }

  async componentDidMount() {
    const user = await this.getUser();
    console.log(user);
    // Set state from matched user.
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.availability.forEach(block =>
      this.setState({ availability: this.state.availability.concat(block) })
    );
  }

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
    }
  };

  onEditProfile = () => {
    this.props.history.push("service_worker/edit");
  };

  render() {
    const {
      firstName,
      lastName,
      aboutMe,
      email,
      phoneNumber,
      availability
    } = this.state;
    return (
      <div className="card container">
        <h1>
          {firstName} {lastName} **checkmark img** User is certified
        </h1>
        <Button onClick={this.onEditProfile}>Edit</Button>
        <h2>About Me</h2>
        <p>{aboutMe}</p>

        <h2>Email</h2>
        <p>{email}</p>

        <h2>Phone</h2>
        <p>{phoneNumber}</p>

        <h2>Availability</h2>
        <TimeTable times={availability} />
      </div>
    );
  }
}
