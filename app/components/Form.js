import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addUserToRecords} from '../redux/Actions';

function Form({data, setData, setModalVisible}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [department, setDepartment] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    const value = {name, email, mobileNo, department};
    // setData([...data, value]);
    setModalVisible(false);
    dispatch(addUserToRecords(value));
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Please Enter Name"
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Please Enter Email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          placeholder="Please Enter Department Name"
          placeholderTextColor={'gray'}
          value={department}
          onChangeText={setDepartment}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Please Enter Mobile Number"
          placeholderTextColor={'gray'}
          keyboardType="numeric"
          value={mobileNo}
          onChangeText={setMobileNo}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        // onPress={user => addUser(user)}>
        onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    // borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 20,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 10,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'rgba(8, 86, 58, 0.876)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Form;
