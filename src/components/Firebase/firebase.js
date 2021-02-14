import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDG78X4YQLwQVFtTyudqh6LHJ2LiRlGSS4",
    authDomain: "svenska-marvelsamlare.firebaseapp.com",
    databaseURL: "https://svenska-marvelsamlare-default-rtdb.firebaseio.com",
    projectId: "svenska-marvelsamlare",
    storageBucket: "svenska-marvelsamlare.appspot.com",
    messagingSenderId: "244092481021",
    appId: "1:244092481021:web:08d2cdef282e98194abd94"
};

const tbfConfig = {
    apiKey: "AIzaSyA4yBmSmQ-RLTzroqIYkr9A42VQcl_Zh1Y",
    authDomain: "thebaseballfield.firebaseapp.com",
    databaseURL: "https://thebaseballfield.firebaseio.com",
    projectId: "thebaseballfield",
    storageBucket: "thebaseballfield.appspot.com",
    messagingSenderId: "115379456982",
    appId: "1:115379456982:web:4d0adc5c1a56b0579b7277"
};

// Set to true if uploading to The Baseball Field & Friends
const useTbfConfig = false;

class Firebase {
    constructor() {
        app.initializeApp(useTbfConfig ? tbfConfig : config);
        this.serverValue = app.database.ServerValue;
        this.auth = app.auth();
        this.db = app.database();
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

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** SMS API ***
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    title = uid => this.db.ref(`titles/${uid}`);
    titles = () => this.db.ref('titles');

    // *** TBF API ***
}

export {useTbfConfig};
export default Firebase;