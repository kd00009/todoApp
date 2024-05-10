import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SCREENS} from '../constants/screens';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import InputField from '../components/InputField';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userUid, setUserUid] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const uid = await AsyncStorage.getItem('user');
      const email = await AsyncStorage.getItem('email');
      if (uid && email) {
        setUserEmail(email);
        setUserUid(uid);
        setLoggedIn(true);
      }
    } catch (error) {
      console.log('Error retrieving UID from AsyncStorage:', error);
    }
  };

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
      navigation.replace(SCREENS.HOME, {user: user.uid});
    } catch (signInError) {
      Alert.alert('Login Error', 'Invalid email or password ');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Sign Up Error', 'Please enter email and password');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      await AsyncStorage.setItem('user', user.uid);
      await AsyncStorage.setItem('email', email);
      navigation.replace(SCREENS.HOME, {user: user.uid});
    } catch (signUpError) {
      if (signUpError.code === 'auth/email-already-in-use') {
        Alert.alert('Sign Up Error', 'User already exists');
      } else {
        Alert.alert('Sign Up Error', 'Invalid email or password');
      }
    }
  };

  const handleContinue = () => {
    navigation.replace(SCREENS.HOME, {user: userUid});
  };
  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text
          style={[
            styles.label,
            {
              color: 'red',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 20,
              width: '100%',
              textAlign: 'center',
            },
          ]}>
          {userEmail}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
      <Button text="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'gray',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    color: '#fff',
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
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  button: {
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    width: '80%',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
});

export default LoginScreen;
