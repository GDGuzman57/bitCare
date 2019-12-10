import React, { Component } from "react";
import WorkerCard from "../components/workerCard.js";
import AvailabilityForm from "../components/Availability/Form";
import NavBar from "../components/NavBar";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

//
// MATERIAL-UI REQUIREMENT #1: tweak or add values here to apply styles to a Material-UI component.
const styles = theme => ({
  palette: {
    background: "#000000"
  }
});

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
    // console.log(
    //   `desiredTime: ${desiredTime.day}, ${desiredTime.start}, ${desiredTime.end}`
    // );

    console.log(desiredTime);

    // Is undefined without "await". WHY?????
    await this.setState({ availabilityBlock: desiredTime });

    console.log(this.state.availabilityBlock);

    let workersReturned;
    if (this.props.model.List) {
      workersReturned = await this.props.model.List(
        this.state.availabilityBlock
      );

      console.log(this.state.availabilityBlock);

      this.setState({
        workerCardList: this.CreateWorkerCard(workersReturned)
      });
    }
  };

  //Uses workers parameter (the return array from Model.List())
  // to create and return an array of {WorkerCard} components
  CreateWorkerCard = workers => {
    let cardList = null;
    console.log(workers);
    cardList = workers.map((aWorker, indexKey) => (
      <WorkerCard worker={aWorker} key={indexKey} />
    ));
    return cardList;
  };

  render() {
    //
    // MATERIAL-UI REQUIREMENT #2: Needed for accessing "styles" CB function declared above this class.
    const { classes } = this.props;

    return (
      <>
        <NavBar />
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col s1">
              <AvailabilityForm
                buttonText="Filter"
                onGetBlock={this.renderInWorkerCards}
              />
            </div>
            <div className="col s1">{this.state.workerCardList}</div>
          </div>
        </div>
      </>
    );
  }
}

//
// MATERIAL-UI REQUIREMENT #3: I don't know why this is needed.
ListServiceWorkers.propTypes = {
  classes: PropTypes.object.isRequired
};

//
// MATERIAL-UI REQUIREMENT #4: Applies styles when render this component.
export default withStyles(styles)(ListServiceWorkers);
