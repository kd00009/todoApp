import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {deleteUserById} from '../services/sqlite';
import {colors} from '../constants/theme';

const Settings = () => {
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      Alert.alert('Signed out', 'You have been signed out.');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.delete();
        await deleteUserById(user.uid);
        Alert.alert('Account deleted', 'Your account has been deleted.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert(
        'Error',
        'Failed to delete account. You may need to sign in again to perform this action.',
      );
    }
  };

  const handleContactSupport = () => {
    const supportEmail = 'support@example.com';
    Linking.openURL(`mailto:${supportEmail}`).catch(err =>
      console.error('An error occurred', err),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  innerContainer: {
    backgroundColor: colors.darkBackground,
    height: 'auto',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    borderColor: colors.primaryText,
    borderWidth: 2,
  },
  buttonText: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: 'bold',textAlign : "center"
  },
});

export default Settings;
