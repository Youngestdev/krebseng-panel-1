import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBdq2Eq1RhOXLjKVFDBCjhZoY7oV83mAJI',
      authDomain: 'krebs-engenharia.firebaseapp.com',
      projectId: 'krebs-engenharia',
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
