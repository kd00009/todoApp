import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { showUserById } from '../services/sqlite';
import { colors } from '../constants/theme';


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          } catch (error) {
            console.error('Error fetching user data from database:', error);
          }
        }
      };

      fetchUserData();
    }, [user])
  );

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
        <View style={styles.userContainer}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{userData.id}</Text>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{userData.age}</Text>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.name ? userData.name : 'N/A'}</Text>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{userData.phoneNumber}</Text>
        </View>
      ) : (
        <Text style={styles.title}>User data not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor : colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: colors.darkBackground,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.background,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    paddingTop: 5,
    color: colors.primaryText,
    fontWeight: 'bold',
  },
});

export default Dashboard;
