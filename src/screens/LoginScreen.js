
import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { SCREENS } from '../constants/screens';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { colors } from '../constants/theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Error', 'Please enter email and password');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      await AsyncStorage.setItem('user', user.uid);
      await AsyncStorage.setItem('email', email);
      navigation.replace('Home');
    } catch (signInError) {
      Alert.alert('Login Error', 'Invalid email or password');
    }
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome !</Text>
      <View style={styles.inputContainer}>
        <InputField
          label="Email"
          placeholder="jhondoe@example/com"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          label="Password"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button text="Login" onPress={handleLogin} />
      <Text style={[styles.label, { marginBottom: 20 }]}>
        Don't have an account? <Text onPress={handleNavigateToSignUp} style={styles.linkText}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    color: colors.primaryText,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
