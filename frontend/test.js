const decision = (value) =>
  new Promise((resolve, reject) => {
    if (value === 5) resolve(5);
    reject(6);
  });

// console.log(
//   decision(7)
//     .then((val) => console.log(val))
//     .catch((er) => console.log(er))
// );
// const decision = (value) =>
//   new Promise((resolve, reject) => {
//     if (value === 5) return resolve(5); // Fulfill the promise with 5
//     return reject(6); // Reject the promise with 6
//   });

decision(7)
  .then((result) => {
    console.log("Resolved with:", result); // This runs if resolve is called
  })
  .catch((error) => {
    console.log("Rejected with:", error); // This runs if reject is called
  });
