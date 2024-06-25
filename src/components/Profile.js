import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {showUserById, updateUserById} from '../services/sqlite';
import {colors} from '../constants/theme';
import {useFocusEffect} from '@react-navigation/native';
import ContactForm from './ContactForm';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [initialUserData, setInitialUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          setUser(currentUser.uid);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        if (user) {
          try {
            const data = await showUserById(user);
            setUserData(data);
            setInitialUserData(data);
          } catch (error) {
            console.error('Error fetching user data from database:', error);
          }
        }
      };

      fetchUserData();
    }, [user]),
  );

  const handleSave = async () => {
    try {
      if (!userData || !userData.id) {
        throw new Error('User data not available');
      }

      if (isNaN(userData.age) || userData.age === '') {
        throw new Error('Age must be a valid number');
      }

      if (
        !/^\d{10}$/.test(userData.phoneNumber) &&
        userData.phoneNumber !== ''
      ) {
        throw new Error('Phone number must be a valid 10-digit number');
      }

      await updateUserById(userData.id, userData);
      Alert.alert('Success', 'User data updated successfully.');
      setInitialUserData(userData);
      setIsChanged(false);
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', error.message || 'Failed to update user data.');
    }
  };

  const handleChange = (field, value) => {
    const updatedUserData = {
      ...userData,
      [field]: value,
    };
    setUserData(updatedUserData);
    setIsChanged(
      JSON.stringify(updatedUserData) !== JSON.stringify(initialUserData),
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.innerContainer}>
          <Text style={styles.label}>User ID:</Text>
          <TextInput
            style={styles.input}
            value={userData.id}
            editable={false}
          />
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={String(userData.age)}
            onChangeText={text => handleChange('age', text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={text => handleChange('name', text)}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={userData.phoneNumber}
            onChangeText={text => handleChange('phoneNumber', text)}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isChanged ? colors.primary : colors.disabled},
            ]}
            onPress={handleSave}
            disabled={!isChanged}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ContactForm/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.primaryText,
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
  input: {
    height: 40,
    borderColor: colors.primaryText,
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    color: colors.primaryText,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: colors.primaryText,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Profile;
