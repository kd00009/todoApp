import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {SvgXml} from 'react-native-svg';
import {EDIT} from '../constants/svg';
import {colors} from '../constants/theme';
import { clientData } from '../data/MeetingsData';

const LeadDetails = () => {


  const renderClientDetails = details => {
    return Object.keys(details).map(key => (
      <View key={key} style={styles.detailRow}>
        <Text style={styles.detailLabel}>{key}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.detailValue}>{details[key]}</Text>
      </View>
    ));
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Header title="Lead Details" />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Client Details</Text>
          </View>
          <SvgXml xml={EDIT} />
        </View>
        {renderClientDetails(clientData)}
      </View>
    </View>
  );
};

export default LeadDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.background,
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
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
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
