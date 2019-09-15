import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "cash-monies.firebaseapp.com",
  databaseURL: "https://cash-monies.firebaseio.com",
  projectId: "cash-monies",
  storageBucket: "cash-monies.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export { firebase, database as default };

// firebase.database().ref('expenses').push({
//   id: '1',
//   description: 'Rent',
//   amount: 109500,
//   createdAt: 0
// });

// firebase.database().ref('expenses').push({
//   id: '2',
//   description: 'Petrol',
//   amount: 30955,
//   createdAt: 0
// });


// firebase.database()
//   .ref('expenses')
//   .on('child_removed', (snapshot) => {
//     store.dispatch(removeExpense())
//     // const expenses = [];
//     // snapshot.forEach((child) => {
//     //   expenses.push({
//     //     ...child.exportVal(),
//     //     id: child.key
//     //   });
//     // })
//     console.log(snapshot.exportVal());
//   })
