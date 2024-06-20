// App.js
import React from 'react';
import { StatusBar } from 'react-native';

import AppNavigator from './src/navigations/AppNavigator';
import { colors } from './src/constants/theme';

const App = () => {
  return (
    <>
      {/* Set status bar color to black */}
      <StatusBar backgroundColor={colors.header_bg} barStyle="light-content" />
      <AppNavigator />
    </>
  );
};

export default App;
