/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import RootNavigator from './navigation/RootNavigator';
import {AuthProvider} from './context/AuthContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
