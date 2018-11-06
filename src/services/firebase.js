import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCxvYa9MHi8E5OkmfN2JR2G4rp4jSWhofM',
      authDomain: 'react-auth0-2b280.firebaseapp.com',
      projectId: 'react-auth0-2b280',
    });

    // initialize Firestore through Firebase
    this.realtimeDatabase = firebase.firestore();

    // disable deprecated features
    this.realtimeDatabase.settings({
      timestampsInSnapshots: true
    });
  }

  async addBuilding(building) {
    const createdAt = new Date();
    const author = firebase.auth().currentUser.displayName;
    return await this.realtimeDatabase.collection('buildings').add({
      author,
      createdAt,
      ...building,
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  async updateProfile(profile) {
    if (!firebase.auth().currentUser) return;
    await firebase.auth().currentUser.updateProfile({
      displayName: profile.name,
      photoURL: profile.picture,
    });
  }

  async signOut() {
    await firebase.auth().signOut();
  }

  setAuthStateListener(listener) {
    firebase.auth().onAuthStateChanged(listener);
  }

  setBuildingsListener(listener) {
    this.realtimeDatabase.collection('buildings').limit(10).onSnapshot(listener);
  }

  async setToken(token) {
    await firebase.auth().signInWithCustomToken(token);
  }
}

const firebaseClient = new Firebase();

export default firebaseClient;
