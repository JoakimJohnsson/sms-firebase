import React from 'react';

// createContext() creates two components:
// FirebaseContext.Provider provides a Firebase instance once at the top-level of your React component tree.
// FirebaseContext.Consumer retrieves the Firebase instance if it is needed in the React component.
const FirebaseContext = React.createContext(null);

// instead of wrapping the entire component - use 'export withFirebase(component)'
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;