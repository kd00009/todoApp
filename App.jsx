// navigations/AppNavigator.js
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import AuthNavigator from './src/navigations/AuthNavigator';
import {createTable, createUsersTable} from './src/services/sqlite';

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    createUsersTable();
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
