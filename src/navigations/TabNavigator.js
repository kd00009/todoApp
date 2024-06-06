import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Dashboard from '../components/Dashboard';
import ContactForm from '../components/ContactForm';
import Home from '../components/Home';
import {colors} from '../constants/theme';
import {SvgXml} from 'react-native-svg';
import {DASHBOARD, FORM, HOME} from '../constants/svg';

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
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <SvgXml
              xml={HOME}
              height={24}
              width={22}
              fill={color} // Use color prop to dynamically set the icon color
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <SvgXml
              xml={DASHBOARD}
              height={24}
              width={22}
              fill={color} // Use color prop to dynamically set the icon color
            />
          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={ContactForm}
        options={{
          tabBarIcon: ({ color }) => (
            <SvgXml
              xml={FORM}
              height={24}
              width={25}
              fill={color} // Use color prop to dynamically set the icon color
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
