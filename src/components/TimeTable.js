import React, { Component } from 'react';
import { TimeTableDay } from './TimeTableDay.js';
import '../TheBlock.css';

//Takes an array of objects into the -times- prop.
//Comes from the Model.List() returned array[x].availability
/*
    times: [
        {   day: "Monday", 
            start: "00:00:00", 
            end: "00:00:00" 
        }
    ]
*/
export class TimeTable extends Component
{

    temp = () => {
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; 
        let test = null;

        test = days.map((day, i) => {
            //find does not work. use filter instead
            let temp = this.props.times.filter((f) => {
                return f.day === day
            })
            if (temp.length !== 0)
            //currently only works with one 'time block'. possible solution(?): 
            //temp.forEach => {day:aDay, avail:[{start:aTime, end:aTime}]}
                return <TimeTableDay day={temp[0].day} beginning={temp[0].start} ending={temp[0].end} key={i} />
            else
                return <TimeTableDay day={day} key={i} />
        })

        test = this.props.times.map(( block, index) => {
           return <TimeTableDay day={block.day} beginning={block.start} ending={block.end} key={index} />
        })

        return test;
    }
    render() {
        return(
            <div className="timeTable">
                <div className="squareBlock"></div>
                <div className="timesBlock">00:00:00</div>
                <div className="timesBlock">01:00:00</div>
                <div className="timesBlock">02:00:00</div>
                <div className="timesBlock">03:00:00</div>
                <div className="timesBlock">04:00:00</div>
                <div className="timesBlock">05:00:00</div>
                <div className="timesBlock">06:00:00</div>
                <div className="timesBlock">07:00:00</div>
                <div className="timesBlock">08:00:00</div>
                <div className="timesBlock">09:00:00</div>
                <div className="timesBlock">10:00:00</div>
                <div className="timesBlock">11:00:00</div>
                <div className="timesBlock">12:00:00</div>
                <div className="timesBlock">13:00:00</div>
                <div className="timesBlock">14:00:00</div>
                <div className="timesBlock">15:00:00</div>
                <div className="timesBlock">16:00:00</div>
                <div className="timesBlock">17:00:00</div>
                <div className="timesBlock">18:00:00</div>
                <div className="timesBlock">19:00:00</div>
                <div className="timesBlock">20:00:00</div>
                <div className="timesBlock">21:00:00</div>
                <div className="timesBlock">22:00:00</div>
                <div className="timesBlock">23:00:00</div>
                <div className="timesBlock">24:00:00</div>

                <div className="daysBlock">Monday</div>
                <div className="daysBlock">Tuesday</div>
                <div className="daysBlock">Wednesday</div>
                <div className="daysBlock">Thursday</div>
                <div className="daysBlock">Friday</div>
                <div className="daysBlock">Saturday</div>
                <div className="daysBlock">Sunday</div>
                {this.temp()}
            </div>
        )
    }
}