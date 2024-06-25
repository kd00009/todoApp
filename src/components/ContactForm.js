import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import SQLite from 'react-native-sqlite-storage';
import { addUser, createUsersTable, showUserById } from '../services/sqlite';
import { colors } from '../constants/theme';
import Profile from './Profile';

const FormField = ({ label, value, onChangeText, placeholder, keyboardType, error }) => (
  <>
    <Text style={[styles.label]}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.errorInput]}
      placeholder={placeholder}
      placeholderTextColor={colors.secondary}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
);

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          setId(currentUser.uid);
          const user = await showUserById(currentUser.uid);
          if (user) {
            setUserExists(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = () => {
    const errors = {};

    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/i.test(phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!age) {
      errors.age = 'Age is required';
    } else if (isNaN(age) || age > 150 || age < 1) {
      errors.age = 'Invalid age';
    }

    if (!name) {
      errors.name = 'Name is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    addUser(id, phone, age, name);
    setName('');
    setPhone('');
    setAge('');
    setUserExists(true);
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
      {userExists ? (
      <Profile/>
      ) : (
        <View style={styles.innerContainer}>
          <FormField
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="enter your 10 digts number "
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <FormField
            label="Age"
            value={age}
            onChangeText={setAge}
            placeholder="enter your age"
            keyboardType="numeric"
            error={errors.age}
          />
          <FormField
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="enter your name"
            error={errors.name}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent : 'center',
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
  input: {
    width: '100%',
    borderColor: colors.primaryText,
    borderBottomColor: colors.primaryText,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primaryText
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: colors.darkBackground,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 80,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 55,
    marginTop: 20,
  },
  buttonText: {
    color: colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize : 20,
    color : colors.primaryText,
  },
});

export default ContactForm;
