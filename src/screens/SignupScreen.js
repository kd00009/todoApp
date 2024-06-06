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
import firestore from '@react-native-firebase/firestore';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { colors } from '../constants/theme';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password ) {
      Alert.alert('Sign Up Error', 'Please enter email and password');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      const user = auth().currentUser;
      await firestore()
      .collection('signup_users')
      .doc(user.uid)
      .set({
        email: email,
      });
      navigation.replace('Home');
    } catch (signUpError) {
      if (signUpError.code === 'auth/email-already-in-use') {
        Alert.alert('Sign Up Error', 'User already exists');
      } else {
        Alert.alert('Sign Up Error', 'Invalid email or password');
      }
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
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
      <Button text="Sign Up" onPress={handleSignUp} />
      <Text style={[styles.label, { marginBottom: 20 }]}> 
      Already have an account? <Text onPress={handleNavigateToLogin} style={styles.linkText}>Login</Text></Text>

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
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,

  },
});

export default SignupScreen;
