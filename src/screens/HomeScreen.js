import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SvgXml} from 'react-native-svg';
import * as icons from '../constants/svg';
import auth from '@react-native-firebase/auth';
import {SCREENS} from '../constants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  const {user} = route.params;

  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = firestore().collection('todos');

  useEffect(() => {
    const unsubscribe = ref
      .where('uid', '==', user)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {text, completed, createdAt} = doc.data();
          list.push({
            id: doc.id,
            title: text,
            complete: completed,
            createdAt: createdAt,
            uid: user.uid,
          });
        });
        list.sort((a, b) => b.createdAt - a.createdAt);
        setTodos(list);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (text) {
      try {
        if (isEditing) {
          await ref.doc(id).update({
            text: text,
            completed: false,
            createdAt: firestore.FieldValue.serverTimestamp(),
            uid: user,
          });
        } else {
          await ref.add({
            text: text,
            completed: false,
            createdAt: firestore.FieldValue.serverTimestamp(),
            uid: user,
          });
        }
        setText('');
        setIsEditing(false);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please enter some text');
    }
    setLoading(false);
  };

  const handleDelete = async id => {
    await ref.doc(id).delete();
  };

  const handleUpdate = async (id, newText) => {
    setIsEditing(true);
    setText(newText);
    setId(id);
  };

  const handleComplete = async id => {
    await ref.doc(id).update({
      completed: true,
    });
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.clear();
      Alert.alert(' signed out! successfully');
      navigation.replace(SCREENS.LOGIN);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.rowStyles}>
          <TextInput
            placeholder="Add Todo"
            placeholderTextColor="black"
            clearButtonMode="always"
            onChangeText={setText}
            value={text}
            style={styles.inputStyles}
          />
          <TouchableOpacity style={styles.buttonStyles} onPress={handleSubmit}>
            <Text
              style={{color: isEditing ? 'red' : 'green', fontWeight: 'bold' , textAlign : 'center'}}>
              {isEditing ? 'Update' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <FlatList
            data={todos}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No tasks added yet</Text>
            )}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <View style={{flex: 0.8}}>
                  <Text
                    style={[
                      item.complete
                        ? styles.completedItem
                        : styles.uncompletedItem,
                      {
                        color: 'black',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        fontSize: 16,
                      },
                    ]}>
                    {item.title}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleComplete(item.id)}
                  disabled={isEditing}>
                  {item.complete ? null : (
                    <SvgXml xml={icons.COMPLETE} width={35} height={30} />
                  )}
                </TouchableOpacity>

                {!item.complete && (
                  <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => handleUpdate(item.id, item.title)}>
                    <SvgXml xml={icons.UPDATE} width={25} height={30} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  disabled={isEditing}>
                  <SvgXml xml={icons.DELETE} width={28} height={30} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>
      <View style={styles.signoutContainer}>
        <TouchableOpacity style={styles.signoutButton} onPress={handleSignOut}>
          <Text style={styles.signoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputStyles: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonStyles: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    width: 100,
  },
  rowStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  flatListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  listItem: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  completedItem: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'white',
  },
  uncompletedItem: {
    textDecorationLine: 'none',
    textDecorationColor: 'white',
  },
  loading: {
    alignSelf: 'center',
  },
  emptyText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signoutContainer: {
    alignItems: 'flex-end',

    marginBottom: 20,
    marginTop: 20,
    width: '100%',
  },
  signoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '20%',
    marginRight: 10,
  },
  signoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
