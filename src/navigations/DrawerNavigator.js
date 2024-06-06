import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Settings from '../components/Settings';
import UserSignupList from '../components/UserSignupList';
import Profile from '../components/Profile';
import {colors} from '../constants/theme';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.secondary,
          width: 240,
        },
        drawerLabelStyle: {
          color: colors.primaryText,
          fontWeight: 'bold',
          fontSize: 18,
          textDecorationLine: 'underline',
        },
        drawerActiveBackgroundColor: colors.darkBackground,
        headerStyle: {
          backgroundColor: colors.darkBackground,
        },
        headerTintColor: colors.primaryText,
      }}>
      <Drawer.Screen
        name="Menu"
        component={TabNavigator}
        options={{headerTitle: ''}}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="User Signup List" component={UserSignupList} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
