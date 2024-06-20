// Dashoboard.js
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';
import { colors } from '../constants/theme';

const Dashoboard = () => {
  const handleMeetingPress = () => {
    console.log('Meeting button pressed');
  };

  const handleLeadsPress = () => {
    console.log('Leads button pressed');
  };

  return (
    <SafeAreaView style={{backgroundColor : colors.background , flex : 1}}>
      <Header
        subTitle="suraj.kumar@axproperties"
        title="Suraj kumar"
        isMainScreen={true}
        backgroundColor="black"
      />
      <View style={styles.container}>
        <Card title="Meetings" onPress={handleMeetingPress} />
        <Card title="Leads" onPress={handleLeadsPress} />
      </View>
    </SafeAreaView>
  );
};

export default Dashoboard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
});
