import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { WorkerCard } from "../components/workerCard.js";
import AvailabilityForm from "../components/Availability/Form";

class ListServiceWorkers extends Component {
  constructor(props) {
    super(props);
    this.state = { workerCardList: null, availabilityBlock: undefined };
  }

  // Fishes out an object from the AvailabilityForm component which contains
  // the day, start time, and end time for a service worker.
  onSubmit = async value => {
    console.log(value);
    await this.setState({ availabilityBlock: value });
    console.log(this.state.availabilityBlock);

    let workersReturned;
    if (this.props.model.List) {
      workersReturned = await this.props.model.List(
        undefined//this.state.availabilityBlock
      );
      this.setState({
        workerCardList: this.CreateWorkerCard(workersReturned)
      });
    }
  };

  listUsers = async () => {
    const availabilityBlock = {
      day: "Tuesday",
      startTime: "14:00:00",
      endTime: "15:00:00"
    };

    let workersReturned;
    if (this.props.model.List) {
      workersReturned = await this.props.model.List(
        this.state.availabilityBlock
      );

      this.setState({ workerCardList: this.CreateWorkerCard(workersReturned) });
    }
  };
  listUsers2 = async () => {
    const availabilityBlock = {
      day: undefined,
      startTime: undefined,
      endTime: undefined
    };
    let workersReturned;
    if (this.props.model.List) {
      workersReturned = await this.props.model.List(undefined /*null*/);
      this.setState({ workerCardList: this.CreateWorkerCard(workersReturned) });
    }
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

  CreateWorkerCard = workers => {
    let cardList = null;
    cardList = workers.map((aWorker, indexKey) => (
      <WorkerCard worker={aWorker} key={indexKey} />
    ));
    return cardList;
  };

  render() {
    return (
      <>
        <h1>OPEN YOUR CONSOLE!</h1>
        <AvailabilityForm buttonText="Filter" onGetBlock={this.onSubmit} />
        <h2>AWS test buttons</h2>
        <Button className="mr-2" onClick={this.createUser}>
          Put
        </Button>
        <Button className="mr-2" onClick={this.onSubmit}>
          List Users
        </Button>
        <Button className="mr-2" onClick={this.listUsers2}>
          List Users2 (different search critea-remove later)
        </Button>
        <br />
        <h2 className="mt-5">Other test buttons</h2>
        <Button
          className="mr-2"
          onClick={() => this.props.model.TimeToSeconds("08:00:00")}
        >
          Get Seconds
        </Button>

        {this.state.workerCardList}
      </>
    );
  }
}

export default ListServiceWorkers;
