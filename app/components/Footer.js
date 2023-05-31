import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addUserToRecords, resetUsers} from '../redux/Actions';
// import {AsyncStorage} from 'react-native';
// import {AsyncStorage} from '@react-native-async-storage/async-storage';

function Footer({data}) {
  const users = useSelector(state => state);
  const dispatch = useDispatch();

  const saveData = async data => {
    try {
      // Convert the data to a JSON string
      const jsonValue = JSON.stringify(data);
      // Save the data to AsyncStorage
      await AsyncStorage.setItem('dataKey', jsonValue);
      console.log('Data saved successfully');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('dataKey');
      dispatch(resetUsers());
      console.log('Data cleared successfully');
    } catch (error) {
      console.log('Error clearing data:', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('dataKey');
        // If data exists, parse the JSON string to a JavaScript object
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (data) {
          // Dispatch an action to update the Redux state with the retrieved data
          dispatch(resetUsers());
          data.forEach(user => {
            dispatch(addUserToRecords(user));
          });
        }
        console.log(data);
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    // Call the getData function within the useEffect hook
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonClear} onPress={clearData}>
          <Text style={styles.buttonText}>CLEAR RECORD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSave}
          onPress={() => saveData(users)}>
          <Text style={styles.buttonText}>SAVE RECORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', width: '100%'},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonClear: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonSave: {
    backgroundColor: 'rgba(8, 86, 58, 0.876)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {color: 'white'},
});

export default Footer;
