import React, { Component } from "react";

export class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientFirstName: "",
      patientLastName: "",
      parentGuardianFirstName: "",
      parentGuardianLastName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      patientCondition: "",
      patientNeeds: ""
    };
  }

  async componentDidMount() {
    const user = await this.getUser();

    // Set state from matched user.
    this.setState({
      patientFirstName: user.patientFirstName,
      patientLastName: user.patientLastName,
      parentGuardianFirstName: user.parentGuardianFirstName,
      parentGuardianLastName: user.parentGuardianLastName,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber,
      patientCondition: user.patientCondition,
      patientNeeds: user.patientNeeds
    });

    console.log(this.state);
  }

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      console.log(user);
      return user;
    }
  };
  render() {
    const {
      patientFirstName,
      patientLastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      email,
      phoneNumber,
      patientCondition,
      patientNeeds
    } = this.state;

    return (
      <div>
        <h1>
          {patientFirstName} {patientLastName}
        </h1>

        <h2>Condition</h2>
        <p>{patientCondition}</p>

        <h2>Needs</h2>
        <p>{patientNeeds}</p>

        <h2>Parent/Guardian</h2>
        <p>
          {parentGuardianFirstName} {parentGuardianLastName}
        </p>

        <h2>Phone</h2>
        <p>{phoneNumber}</p>

        <h2>Email</h2>
        <p>{email}</p>
      </div>
    );
  }
}
