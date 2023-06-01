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
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromRecords} from '../redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditForm from './EditForm';

function UserInfoCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const users = useSelector(state => state);
  const dispatch = useDispatch();
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const onEdit = index => {
    setSelectedUserIndex(index);
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
          <View style={styles.detailsContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <Text style={styles.cardText}>Name</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text style={styles.valuesText}>{item.name}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <Text style={styles.cardText}>Email</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text style={styles.valuesText}>{item.email}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <Text style={styles.cardText}>Mobile No.</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text style={styles.valuesText}>{item.mobileNo}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <Text style={styles.cardText}>Department</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text style={styles.valuesText}>{item.department}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(index)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteUser(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={modalVisible} transparent={false}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.modalContent}>
                  {selectedUserIndex !== null && (
                    <EditForm
                      Name={users[selectedUserIndex].name}
                      Email={users[selectedUserIndex].email}
                      MobileNo={users[selectedUserIndex].mobileNo}
                      Department={users[selectedUserIndex].department}
                      setModalVisible={setModalVisible}
                      index={selectedUserIndex}
                    />
                  )}
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
      <TextInput
        style={styles.searchbox}
        placeholder="Search....."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderUserInfoCard}
        keyExtractor={item => item.email}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 20, marginBottom: 150},
  card: {
    backgroundColor: 'rgb(213, 217, 218)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: 300,
  },
  detailsContainer: {
    // justifyContent: 'space-between',
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
    backgroundColor: '#00665B',
    padding: 10,
    width: 90,
    borderRadius: 19,
    marginRight: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 90,
    borderRadius: 19,
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
  searchbox: {
    fontSize: 15,
    backgroundColor: 'gray',
    width: '90%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    color: 'white',
  },
});

export default UserInfoCard;
