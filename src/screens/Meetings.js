// Meetings.js
import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MeetingCard from '../components/MeetingCard';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {meetingsData} from '../data/MeetingsData';
import {SvgXml} from 'react-native-svg';
import {ADD} from '../constants/svg';
import {colors} from '../constants/theme';

const Meetings = () => {
  const navigation = useNavigation();

  const handlePress = meeting => {
    navigation.navigate('MeetingDetails', {meeting});
  };

  return (
    <>
      <Header title="All Meetings" />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <SvgXml xml={ADD} />
          <Text
            style={styles.text}>
            Add Meeting
          </Text>
        </View>
        <FlatList
          data={meetingsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <MeetingCard
                name={item.name}
                flat={item.flat}
                date={item.date}
                lname={item.lname}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  text : {
    marginLeft: 10,
    color: colors.primary,
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  }
});

export default Meetings;
