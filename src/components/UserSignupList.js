import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import firestore from '@react-native-firebase/firestore';
  import {colors} from '../constants/theme';
  
  const UserSignupList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = firestore()
        .collection('signup_users')
        .onSnapshot(querySnapshot => {
          const usersList = [];
          querySnapshot.forEach(documentSnapshot => {
            usersList.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          console.log('Fetched users: ', usersList);
          setUsers(usersList);
          setLoading(false);
        }, error => {
          console.error('Error fetching users: ', error);
          setLoading(false);
        });
  
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.userContainer}>
                <Text>No users found</Text>
              </View>
            }
            data={users}
            renderItem={({item}) => (
              <View style={styles.userContainer}>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
            )}
          />
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
    userContainer: {
      padding: 14,
      marginBottom: 15,
      backgroundColor: colors.secondary,
      borderWidth: 2,
      borderColor: colors.white,
      borderRadius: 20,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
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
    userEmail: {
      fontSize: 18,
      color: colors.primaryText,
      fontWeight: 'bold',
    },
  });
  
  export default UserSignupList;
  