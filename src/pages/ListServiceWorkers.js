import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class ListServiceWorkers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  listUsers = async () => {
    const availabilityBlock = {
      day: "Tuesday",
      startTime: "14:00:00",
      endTime: "15:00:00"
    };
    if (this.props.model.List) this.props.model.List(availabilityBlock);
  };

  createUser = async () => {
    const user = {
      firstName: "John",
      lastName: "Wayne",
      email: "j.wayne@email.com",
      password: "123456",
      phoneNumber: "123-456-7890",
      aboutMe: "I take pleasure in taking care of people :)",
      availability: [
        { day: "Monday", start: "09:00:00", end: "10:30:00" },
        { day: "Tuesday", start: "09:30:00", end: "13:30:00" }
      ]
    };

    if (this.props.model.CreateUser) this.props.model.CreateUser(user);
  };

  // deleteUser = async () => {
  //   if (this.props.model.DeleteUser)
  //     this.props.model.DeleteUser("email3@email.ca");
  // };

  render() {
    return (
      <>
        <h1>OPEN YOUR CONSOLE!</h1>
        <h2>AWS test buttons</h2>
        <Button className="mr-2" onClick={this.createUser}>
          Put
        </Button>
        <Button className="mr-2" onClick={this.listUsers}>
          List Users
        </Button>
        <br />
        <h2 className="mt-5">Other test buttons</h2>
        <Button
          className="mr-2"
          onClick={() => this.props.model.TimeToSeconds("08:00:00")}
        >
          Get Seconds
        </Button>
      </>
    );
  }
}

export default ListServiceWorkers;
