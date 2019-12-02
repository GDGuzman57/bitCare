import React, { Component } from 'react';
import { BasicButton } from '../components/basicButton.js';
import { TimeTable } from '../components/TimeTable.js';

export class WorkerCard extends Component
{
    constructor(props) {
        super(props);
        this.state = { buttonData : { buttonName : "Book", buttonFunction : this.tempFunction }}
    }

//Function passed to Book button (BasicButton component)
    tempFunction = () => {
        console.log("placeholder function");
    }

    render() {
        return(
            <div>
                <div>Name: {this.props.worker.firstName} {this.props.worker.lastName}</div>
                <div>Email: {this.props.worker.email}</div>
{/*Not sure if to include the aboutMe. Is for profile page?*/}
                {/*<div>{this.props.worker.aboutMe}</div>*/}

                <TimeTable times={this.props.worker.availability} />

                <BasicButton buttonStuff={this.state.buttonData} />
            </div>
        )
    }
}