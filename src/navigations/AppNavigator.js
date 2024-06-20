import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SvgXml} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import Dashoboard from '../screens/Dashoboard';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {DASHBOARD, DASHBOARD_ACTIVE, FAV, FAV_ACTIVE} from '../constants/svg';
import {colors} from '../constants/theme';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Tabs" component={Tabs} />
      <MainStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </MainStack.Navigator>
  </NavigationContainer>
);

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTitleStyle: {color: colors.primaryText},
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
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <SvgXml xml={focused ? DASHBOARD_ACTIVE : DASHBOARD} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => <SvgXml xml={focused ? FAV_ACTIVE : FAV}  width={40} height={40} />,
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.primary,
    borderTopWidth: 1,
    height: 60,
    paddingHorizontal: 80,
  },
  tabBarItem: {
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 40,
    flex: 1,
    alignItems: 'center',
  },
  tabBarLabel: {
    fontWeight: 'bold',
    color: colors.primaryText,
    fontSize: 12,
    paddingHorizontal: 4,
  },
});
