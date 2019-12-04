import React, { Component } from "react";

export class ClientProfile extends Component {
  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      console.log(user);

      return user;
    }
  };
  render() {
    this.getUser();
    return <div>**Client Profile Page**</div>;
  }
}
