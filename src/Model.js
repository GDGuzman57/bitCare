import { observable } from "mobx";
import uuid from "uuid"; // Generates a seemingly random id. Used for user sign ups.

export const Model = observable({ test: true });

//
// Updates a user's properties by taking in an object as an argument.
Model.UpdateUser = async function(userObject) {
  let fetchData, putData, reply, data, users;

  try {
    const Endpoint =
      "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/mydata.json";

    fetchData = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      }
    };

    reply = await fetch(Endpoint, fetchData);
    data = await reply.json();

    users = JSON.parse(JSON.stringify(data));

    //
    // Finds an object with a similar id to the object that was passed as an argument.
    // Replaces matched object with the updated object that was passed as an arugment.
    users.forEach((user, index) => {
      if (user.id === userObject.id) users.splice(index, 1, userObject);
    });

    const ObjectToStoreInJSON = JSON.stringify(users);

    // Make a PUT request to update AWS bucket object.
    putData = {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      },
      body: ObjectToStoreInJSON
    };

    const PutReply = await fetch(Endpoint, putData);

    // Should return true if request was successful.
    return PutReply && PutReply.status === 200;
  } catch (e) {
    console.log("[UpdateUser] Exception! e -->");
    console.log(e);
  }
};

Model.Logout = function() {
  try {
    // Clears all items in the session storage.
    sessionStorage.clear();
  } catch (e) {
    console.log("[Login] Exception! e -->");
    console.log(e);
  }
};

//
// Login function that creates a items in the browser's session storage.
Model.Login = async function(email, password) {
  let fetchData, reply, data;

  try {
    const Endpoint =
      "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/mydata.json";

    fetchData = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      }
    };

    reply = await fetch(Endpoint, fetchData);
    data = await reply.json();

    //
    // Returns true if email and password are valid. Store's the users "id", "isServiceWorker", and "isLoggedIn" values
    // as session storage items.
    const isUser = await data.some(user => {
      if (user.email === email && user.password === password) {
        console.log("From Model: login successful!");

        // Creates an "id" item in browser's session storage. Value is equal to matched user's id.
        sessionStorage.setItem("id", user.id);

        // Creates an "isServiceWorker" item in brower's session storage. Value is "true" if user is a
        // service worker. Value is "false" if user is a client.
        sessionStorage.setItem(
          "isServiceWorker",
          user.isServiceWorker.toString() // Converts boolean value to string. A browser's session storage CAN ONLY store strings.
        );

        // Creates an "isLoggedIn" item in browser's session storage. Value is set to "true" if user's email
        // and password are valid.
        sessionStorage.setItem("isLoggedIn", true.toString());

        return true;
      } else {
        console.log("From Model: login failed!");
        return false;
      }
    });

    return isUser ? true : false;
  } catch (e) {
    console.log("[Login] Exception! e -->");
    console.log(e);
  }
};

//
// Converts a time string (24-hour format) to its equivalent value in seconds.
// You can use the output of this method to check if one the worker's time blocks
// are greater than or equal to a client's search criteria.
Model.TimeToSeconds = function(time) {
  // Turns time string to an array of substrings.
  let array = time.split(":");

  // Converts each string in array to number.
  let seconds = +array[0] * 60 * 60 + +array[1] * 60 + +array[2];

  return seconds;
};

//
// Returns a user object with an id that matches to the passed argument.
Model.FindOne = async function(userId) {
  let fetchData, reply, data, userObject;

  try {
    const Endpoint =
      "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/mydata.json";

    fetchData = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      }
    };

    reply = await fetch(Endpoint, fetchData);
    data = await reply.json();

    //
    // Finds an object with a similar id to userId argument.
    await data.forEach(user => {
      if (user.id === userId) userObject = user; // FIXME:
    });

    return userObject;
  } catch (e) {
    console.log("[FindOne] Exception! e -->");
    console.log(e);
  }
};

// ATTENTION: availabilityBlock must be passed an OBJECT as an argument! Below is the schema.
Model.List = async function(availabilityBlock = undefined) {
  /*************************** 
  SCHEMA for availabilityBlock
  {
    day: string,
    start: string(24-h format),
    end: string(24-h format)
  }
  ***************************/
  let fetchData, reply, data, users;
  let filteredUsers = [];

  try {
    const Endpoint =
      "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/mydata.json";

    fetchData = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      }
    };

    reply = await fetch(Endpoint, fetchData);
    data = await reply.json();

    // Assigns a deep copy of the fetched data to 'users'.
    users = JSON.parse(JSON.stringify(data));

    // If no arguments were passed, list all users.
    if (availabilityBlock !== undefined) {
      const startTime = this.TimeToSeconds(availabilityBlock.startTime);
      const endTime = this.TimeToSeconds(availabilityBlock.endTime);

      // Filters users whose availability matches to what was passed an an arguemnt
      // to availabilityBlock.
      filteredUsers = users.filter(user => {
        return user.availability.some(available => {
          return (
            available.day === availabilityBlock.day &&
            (this.TimeToSeconds(available.start) >= startTime ||
              this.TimeToSeconds(available.end) <= endTime)
          );
        });
      });

      console.log(filteredUsers);
      return filteredUsers;
    } else {
      console.log(data);
      return data;
    }
  } catch (e) {
    console.log("[List] Exception! e -->");
    console.log(e);
  }
};

Model.CreateUser = async function(user) {
  /***************************
   SCHEMA for service worker user
  {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    aboutMe: string,
    availability: [ 
      {
        day: string,
        start: string (time, 24-h format),
        end: string (time, 24-h format)
      }
    ]
  } 
  ***************************/
  let reply, data, fetchData, users;

  try {
    const Endpoint =
      "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/mydata.json"; // + ".json";

    // First make a GET request to get the current array of employee objects.
    fetchData = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      }
    };

    reply = await fetch(Endpoint, fetchData);
    data = await reply.json();

    // Use deep copying on the JSON data that was requested.
    users = JSON.parse(JSON.stringify(data));

    // Add to the current deep copy of the data that was retrieved.
    users.push(user);

    // Convert the payload to JSON.
    const ObjectToStoreInJSON = JSON.stringify(users);

    // Build out the request body.  The x-amz-* headers are required by AWS.
    let PutData = {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": ObjectToStoreInJSON.length,
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      },
      body: ObjectToStoreInJSON
    };
    // Start the async call.
    console.log("[validation-page.js] Preparing to fetch/put, payload -->");
    console.log(Endpoint);
    console.log(PutData);
    let Fetchreply = await fetch(Endpoint, PutData);
    console.log("Heard back from fetch/put --> ");
    console.log(Fetchreply);
    // Assess.
    return Fetchreply && Fetchreply.status === 200;
  } catch (e) {
    console.log("[CreateUser] Exception! e -->");
    console.log(e);
  }
};

// FIXME: This method is a work in progress.
Model.DeleteUser = async function(email) {
  let reply, data, fetchData, users;

  try {
    const Endpoint =
      "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/mydata.json"; // + ".json";

    // First make a GET request to get the current array of employee objects.
    fetchData = {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      }
    };

    reply = await fetch(Endpoint, fetchData);
    data = await reply.json();

    // Use deep copying on the JSON data that was requested.
    users = JSON.parse(JSON.stringify(data));

    users = users.filter(user => user.email !== email);

    // Convert the payload to JSON.
    const ObjectToStoreInJSON = JSON.stringify(users);

    // Build out the request body.  The x-amz-* headers are required by AWS.
    let PutData = {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": ObjectToStoreInJSON.length,
        "x-amz-date": new Date().toUTCString(),
        "x-amz-acl": "public-read"
      },
      body: ObjectToStoreInJSON
    };
    // Start the async call.
    console.log("[validation-page.js] Preparing to fetch/put, payload -->");
    console.log(Endpoint);
    console.log(PutData);
    let Fetchreply = await fetch(Endpoint, PutData);
    console.log("Heard back from fetch/put --> ");
    console.log(Fetchreply);
    // Assess.
    return Fetchreply && Fetchreply.status === 200;
  } catch (e) {
    console.log("[DeleteUser] Exception! e -->");
    console.log(e);
  }
};