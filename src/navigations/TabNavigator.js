import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';

import {colors} from '../constants/theme';
import {SvgXml} from 'react-native-svg';
import { FORM, HOME} from '../constants/svg';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: {color: colors.primaryText},
        headerShown: false,
        tabBarBackgroundColor: colors.darkBackground,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primaryText,
        tabBarBackgroundStyle: {
          backgroundColor: colors.darkBackground,
        },
        tabBarItemStyle: {
          backgroundColor: colors.darkBackground,
          borderRadius: 10,
          padding: 5,
          justifyContent: 'center',
        },
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          color: colors.primaryText,
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <SvgXml
              xml={HOME}
              height={24}
              width={22}
              fill={color} 
            />
          ),
        }}
      />
      <Tab.Screen
      
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color}) => (
            <SvgXml
              xml={FORM}
              height={24}
              width={25}
              fill={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.darkBackground,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigator;
