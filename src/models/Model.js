import { observable } from "mobx";

import firebase from "../firebase";
import "firebase/database";

export const Model = observable({ test: true });

Model.ListUsers = async function() {
  let users = [];

  firebase
    .firestore()
    .collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => users.push(doc.data()));
    });

  return await users;
};

Model.CreateUser = function() {
  let database = firebase.firestore();
  database
    .collection("users")
    .doc()
    .set({ email: "sample5@email.com" });
};

// Model.PutToAwsBucket = async function(Key) {
//   try {
//     // Endpoint on AWS.  Change "your-bucket-name" to ... you can guess.
//     const PutUrl =
//       "https://bvc-vincibucket.s3.ca-central-1.amazonaws.com/sampledata.json"; // + ".json";
//     // Convert the payload to JSON.
//     const ObjectToStoreInJSON = JSON.stringify({
//       test: true
//     });
//     // Build out the request body.  The x-amz-* headers are required by AWS.
//     let FetchData = {
//       method: "PUT",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "omit",
//       headers: {
//         "Content-Type": "application/json",
//         "Content-Length": ObjectToStoreInJSON.length,
//         "x-amz-date": new Date().toUTCString(),
//         "x-amz-acl": "public-read"
//       },
//       body: ObjectToStoreInJSON
//     };
//     // Start the async call.
//     console.log("[validation-page.js] Preparing to fetch/put, payload -->");
//     console.log(PutUrl);
//     console.log(FetchData);
//     let FetchReply = await fetch(PutUrl, FetchData);
//     console.log("Heard back from fetch/put --> ");
//     console.log(FetchReply);
//     // Assess.
//     return FetchReply && FetchReply.status === 200;
//   } catch (e) {
//     console.log("[PutToAwsBucket] Exception! e -->");
//     console.log(e);
//   }
// };
