import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Dashoboard from '../screens/Dashoboard';
import Meetings from '../screens/Meetings';
import Leads from '../screens/Leads';
import {
  DASHBOARD,
  DASHBOARD_ACTIVE,
  LEADS,
  LEADS_ACTIVE,
  MEETINGS,
  MEETINGS_ACTIVE,
} from '../constants/svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../constants/theme';
import {SvgXml} from 'react-native-svg';
import {createStackNavigator} from '@react-navigation/stack';
import LeadDetails from '../screens/LeadDetails';
import MeetingDetails from '../screens/MettingsDetails';

const Stack = createStackNavigator();

const LeadsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Leads'>
      <Stack.Screen
        name="Leads"
        component={Leads}
        options={{title: 'All Leads'}}
      />
      <Stack.Screen
        name="LeadDetails"
        component={LeadDetails}
        options={{title: 'Lead Details'}}
      />
    </Stack.Navigator>
  );
};

const MeetingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Meetings'>
      <Stack.Screen
        name="Meetings"
        component={Meetings}
        options={{title: 'Meetings'}}
      />
      <Stack.Screen
        name="MeetingDetails"
        component={MeetingDetails}
        options={{title: 'Meeting Details'}}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleStyle: {color: colors.primaryText},
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.primaryText,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
        <Tab.Screen
          name="Home"
          component={Dashoboard}
          options={{
            tabBarIcon: ({focused, color}) => (
              <SvgXml xml={focused ? DASHBOARD_ACTIVE : DASHBOARD} />
            ),
          }}
        />
        <Tab.Screen
          name="meetings"
          component={MeetingStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <SvgXml xml={focused ? MEETINGS_ACTIVE : MEETINGS} />
            ),
          }}
        />
        <Tab.Screen
          name="Form"
          component={LeadsStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <SvgXml xml={focused ? LEADS_ACTIVE : LEADS} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.primary, // Set border top color to primary
    borderTopWidth: 1, // Ensure the border is visible
    height: 60,
    paddingHorizontal : 80 // Adjust height as needed
  },
  tabBarItem: {
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 40, // Reduced padding to bring icons closer
    flex: 1,
    alignItems: 'center', // Center icons within their respective tabs
  },
  tabBarLabel: {
    fontWeight: 'bold',
    color: colors.primaryText,
    fontSize: 12,
    paddingHorizontal: 4,
  },
});
