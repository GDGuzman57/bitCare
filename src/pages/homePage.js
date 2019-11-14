import React, { Component } from 'react';
import { BasicButton } from '../components/basicButton.js';
import { HomeDesc } from '../components/HomePageIntroDescription.js';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state = { username : "", 
                        password : "",
                        signInButton : { buttonName: "Sign In",
                                        buttonFunction: this.signInFunction} }
    }

    signInFunction = () => {
        console.log("signing in");

        let userType = null;
        //TODO: set userType based on some data
        this.gotToProfilePage(userType);
    }
    
    gotToProfilePage = (userType) => {
        if (userType == "ServiceWorker")
            this.props.history.push("/signin/service_worker-profile");
        else if (userType == "Client")
            this.props.history.push("/signin/client-profile");
        else
            console.log("User has not logged in/incorrect log in");
    }

    goToSignUpPage = () => {
        this.props.history.push("/signup");
    }

    tempFunction = () => {
        console.log("placeholder function that does nothing");
    }

    render() {
        return(
            <div>

                <div>
                    **ImageBanner**
                </div>

                <div>
                    <span>
                        <HomeDesc />
                    </span>

                    <span>
                        **Login area**

                        <Form.Group sm as={Col} controlId="formGridUserName">
                        <Form.Label>Username</Form.Label>
                            <Form.Control
                                onChange={this.tempFunction}
                                type="text"
                                placeholder="enter username" />
                        </Form.Group>

                        <Form.Group sm as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={this.tempFunction}
                                type="password"
                                placeholder="enter password" />
                        </Form.Group>

                        <div onClick={this.goToSignUpPage}>
                            Don't have an account?
                        </div>

                        <BasicButton buttonStuff={this.state.signInButton} />
                    </span>
                </div>

            </div> 
        )
    }
}