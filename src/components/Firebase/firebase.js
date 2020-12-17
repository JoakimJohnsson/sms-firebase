import app from 'firebase/app';

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
    }
}

export default Firebase;