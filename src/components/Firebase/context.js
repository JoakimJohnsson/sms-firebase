import React from 'react';

// createContext() creates two components:
// FirebaseContext.Provider provides a Firebase instance once at the top-level of your React component tree.
// FirebaseContext.Consumer retrieves the Firebase instance if it is needed in the React component.
const FirebaseContext = React.createContext(null);

export default FirebaseContext;