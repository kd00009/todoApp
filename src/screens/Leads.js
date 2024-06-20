import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import LeadsCard from '../components/LeadsCard';
import {SvgXml} from 'react-native-svg';
import {ADD} from '../constants/svg';
import {colors} from '../constants/theme';
import {LeadsData} from '../data/MeetingsData';

const Leads = () => {
  const navigation = useNavigation();

  const handlePress = lead => {
    navigation.navigate('LeadDetails', {lead});
  };

  return (
    <>
      <Header title="All Leads" />
      <View style={styles.container}>
        <View style={styles.addLeadsContainer}>
          <SvgXml xml={ADD} />
          <Text style={styles.addLeadsText}>Add Leads</Text>
        </View>
        <FlatList
          data={LeadsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <LeadsCard
                id={item.id}
                name={item.name}
                type={item.type}
                status={item.status}
                number={item.number}
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
  addLeadsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  addLeadsText: {
    marginLeft: 10,
    color: colors.primary,
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  },
});

export default Leads;
