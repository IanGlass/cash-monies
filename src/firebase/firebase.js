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

export default firebase.initializeApp(firebaseConfig);

firebase.database().ref().set({
  name: 'Ian Glass',
  age: 26,
  isSingle: false
})
.then(() => {
  console.log('Data is saved')
})
.catch((error) => {
  console.log(error);
})

// firebase.database()
//   .ref('attributes')
//   .set({
//     height: 180,
//     weight: 85
//   })
//   .then(() => {
//     console.log('Success!');
//   })
//   .catch((error) => {
//     console.log(`An error occurred ${error}`);
//   })

firebase.database()
  .ref('isSingle')
  .remove()
  .then(() => {
    console.log('Removed!')
  })