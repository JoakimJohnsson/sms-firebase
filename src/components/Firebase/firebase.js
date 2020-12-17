import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDG78X4YQLwQVFtTyudqh6LHJ2LiRlGSS4",
    authDomain: "svenska-marvelsamlare.firebaseapp.com",
    projectId: "svenska-marvelsamlare",
    storageBucket: "svenska-marvelsamlare.appspot.com",
    messagingSenderId: "244092481021",
    appId: "1:244092481021:web:08d2cdef282e98194abd94"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // Let's define all the authentication functions as class methods step by step.
    // They will serve our communication channel from the Firebase class to the Firebase API.

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

}

export default Firebase;