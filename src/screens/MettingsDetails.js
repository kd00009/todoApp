import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/theme';
import Header from '../components/Header';
import {clientDetails, meetingDetails} from '../data/MeetingsData';

const MeetingDetails = () => {
  const renderClientDetails = details => {
    return Object.keys(details).map(key => (
      <View key={key} style={styles.detailRow}>
        <Text style={styles.detailLabel}>{key}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.detailValue}>{details[key]}</Text>
      </View>
    ));
  };
  const renderMeetingDetails = details => {
    return Object.keys(details).map(key => (
      <View key={key} style={styles.detailRow}>
        <Text style={styles.detailLabel}>{key}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.detailValue}>{details[key]}</Text>
      </View>
    ));
  };

  return (
    <>
      <Header title="Meeting Details" />

      <ScrollView style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Client Details</Text>
          </View>
        </View>
        {renderClientDetails(clientDetails)}

        <View style={styles.headerRow}>
          <View style={styles.titleContainer2}>
            <Text style={styles.title}>Meeting Information And Location</Text>
          </View>
        </View>
        {renderMeetingDetails(meetingDetails)}

        <TouchableOpacity
          style={styles.btn}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: colors.textColor,
            }}>
            convert to booking
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default MeetingDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  btn : {
    backgroundColor: '#BFBFBF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 80,
    borderRadius: 10,
    marginTop : 40,
    borderWidth : 1 ,
    borderColor : colors.primary
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  titleContainer: {
    position: 'relative',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    flex: 0.5,
  },
  titleContainer2: {
    position: 'relative',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    flex: 0.9,
  },
  title: {
    fontSize: 20,
    color: colors.textColor,
    fontWeight: 'bold',
  },
  underline: {
    height: 1,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    width: 150,
  },
  detailRow: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailLabel: {
    fontWeight: '500',
    fontSize: 19,
    color: colors.textColor,
    flex: 0.9,
  },
  colon: {
    color: 'black',
    flex: 0.2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 16,
    color: colors.textColor,
    flex: 1,
    fontWeight: '400',
  },
});
