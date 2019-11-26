import React, { Component } from 'react';

//BasicButton component requires one object pass to props.
//this.props.buttonStuff = {buttonName : 'a string', 
//                          buttonFunction : 'a function'}
//Returns a single button element.
export class BasicButton extends Component
{
    constructor(props) {
        super(props);
        this.state = { theName: this.props.buttonStuff.buttonName, 
                       theFunction : this.props.buttonStuff.buttonFunction};
    }

    OnClick = () => {
        if (this.state.theFunction)
            this.state.theFunction();
        else
            console.log("This button has no function");
    }

    render() {
        return(
            <button type="button" onClick={this.OnClick}>
                {this.state.theName}
            </button>
        )
    }
}