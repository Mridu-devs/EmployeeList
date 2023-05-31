import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromRecords} from '../redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditForm from './EditForm';

function UserInfoCard() {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const users = useSelector(state => state);
  const dispatch = useDispatch();

  const onEdit = () => {
    setModalVisible(true);
  };

  const deleteUser = async index => {
    // Retrieve the current data from AsyncStorage
    const jsonData = await AsyncStorage.getItem('dataKey');
    const data = JSON.parse(jsonData) || [];

    // Remove the user from the data array
    const updatedData = data.filter((user, i) => i !== index);

    try {
      // Convert the updated data to a JSON string
      const updatedJsonData = JSON.stringify(updatedData);
      // Save the updated data to AsyncStorage
      await AsyncStorage.setItem('dataKey', updatedJsonData);
      console.log('Data removed from AsyncStorage successfully');
    } catch (error) {
      console.log('Error removing data from AsyncStorage:', error);
    }

    // Dispatch the removeItemFromRecords action to update the Redux state
    dispatch(removeItemFromRecords(index));
  };
  console.log('users', users);

  const renderUserInfoCard = ({item, index}) => {
    return (
      <SafeAreaView>
        <View style={styles.card}>
          <View>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.cardText}>Name</Text>
                <Text style={styles.cardText}>Email</Text>
                <Text style={styles.cardText}>Mobile No.</Text>
                <Text style={styles.cardText}>Department</Text>
              </View>
              <View>
                <Text style={styles.valuesText}>{item.name}</Text>
                <Text style={styles.valuesText}>{item.email}</Text>
                <Text style={styles.valuesText}>{item.mobileNo}</Text>
                <Text style={styles.valuesText}>{item.department}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteUser(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.modalContent}>
                  <EditForm
                    Name={item.name}
                    Email={item.email}
                    MobileNo={item.mobileNo}
                    Department={item.department}
                    setModalVisible={setModalVisible}
                    index={index}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserInfoCard}
        keyExtractor={item => item.email}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 20},
  card: {
    backgroundColor: 'rgb(145, 143, 143)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  valuesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  editButton: {
    backgroundColor: 'rgba(8, 86, 58, 0.876)',
    padding: 10,
    width: 100,
    borderRadius: 25,
    marginRight: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: '100%',
  },
});

export default UserInfoCard;
