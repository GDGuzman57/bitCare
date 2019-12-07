import React, { Component } from "react";
import { WorkerCard } from "../components/workerCard.js";
import AvailabilityForm from "../components/Availability/Form";

class ListServiceWorkers extends Component {
  constructor(props) {
    super(props);
    this.state = { workerCardList: null, availabilityBlock: undefined };
  }

  // Fishes out an object from the AvailabilityForm component which contains
  // the day, start time, and end time for a service worker.

  //desiredTime = { day: , startTime: , endTime:}
  //Gets return array from Model.List() using parameter, to display a list of {WorkerCard}s
  renderInWorkerCards = async desiredTime => {
    this.setState({ availabilityBlock: desiredTime });

    let workersReturned;
    if (this.props.model.List) 
    {
      workersReturned = await this.props.model.List(this.state.availabilityBlock);
      this.setState({ workerCardList: this.CreateWorkerCard(workersReturned) });
    }
  };

  //Uses workers parameter (the return array from Model.List()) 
  // to create and return an array of {WorkerCard} components
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
        <AvailabilityForm buttonText="Filter" onGetBlock={this.renderInWorkerCards} />
        {this.state.workerCardList}
      </>
    );
  }
}
export default ListServiceWorkers;
