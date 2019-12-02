import React, { Component } from 'react';
import '../TheBlock.css';

export class TimeTableDay extends Component
{
    /*test = () => {
        let stuff = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        let temp;
        temp = stuff.map((i, index) => {
            return <span className="Block" key={index} />
        })
        return temp;
    }*/

    adjust = () => {
        let temp = "" + this.props.ending;
        let nT = temp.split(":");
        let rNT = parseInt(nT[0]);
        if (parseInt(nT[1]) >= 30)
            rNT += 1;
        return rNT;
    }
    classification = () => {
        let cND = this.props.day + "Zone";

        let temp = "" + this.props.beginning;
        let cNS = "StartTime" + temp.split(":")[0];

        let cNE = "EndTime" + this.adjust();        

        return "chosenBlock " + cND + " " + cNS  + " " + cNE;
    }
    test = () => {
        let temp = this.props.beginning;
        temp = temp.split(":");
        temp = temp[0] + ":" + temp[1];

        let temp2 = this.props.ending;
        temp2 = temp2.split(":");
        temp2 = temp2[0] + ":" + temp2[1];

        return temp + "-" + temp2
    }
    render() {
        return(
            <div className={this.classification()}>
                <p className="fitting">{this.test()}{/*this.props.beginning}-{this.props.ending*/}</p>
                
            </div>
        )
    }
}