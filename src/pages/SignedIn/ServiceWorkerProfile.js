import React, { Component } from "react";
import { TimeTable } from "../../components/TimeTable";

export class ServiceWorkerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      fullName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      availability: []
    };
  }

  async componentDidMount() {
    const user = await this.getUser();

    // Set state from matched user.
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.availability.forEach(block =>
      this.setState({ availability: this.state.availability.concat(block) })
    );

    console.log(this.state);
  }

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      console.log(user);
      return user;
    }
  };

  userInfo = async () => {
    const user = await this.getUser();
    console.log(user.firstName);
    return user.firstName;
  };

  render() {
    const { fullName, aboutMe, email, phoneNumber, availability } = this.state;
    return (
      <div>
        <h1>{fullName} **checkmark img** User is certified</h1>

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
