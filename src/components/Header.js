import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {BACK, NOTIFICATION, SETTINGS} from '../constants/svg';
import {colors} from '../constants/theme';

const Header = ({title, isMainScreen, backgroundColor, subTitle}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer]}>
      {!isMainScreen && (
        <View style={styles.nonMainHeaderContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <SvgXml xml={BACK} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      )}
      {isMainScreen && (
        <View style={styles.mainHeaderContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>{title}</Text>
   
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <SvgXml xml={NOTIFICATION} />
            </TouchableOpacity>
            <View style={styles.iconSpacing} />
            <TouchableOpacity>
              <SvgXml xml={SETTINGS} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.header_bg,
  },
  nonMainHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {},
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  mainHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSpacing: {
    width: 10,
  },
});
