import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addUserToRecords} from '../redux/Actions';

function Form({setModalVisible}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [department, setDepartment] = useState('');

  const [nameError, setNameError] = useState('  ');
  const [emailError, setEmailError] = useState('  ');
  const [mobileNoError, setMobileNoError] = useState('  ');
  const [departmentError, setDepartmentError] = useState('  ');

  const dispatch = useDispatch();

  const onSubmit = () => {
    const value = {name, email, mobileNo, department};
    if (
      nameError === '' &&
      emailError === '' &&
      departmentError === '' &&
      mobileNoError === ''
    ) {
      Alert.alert('Submitted successfully');
      console.log('valuess', value);
      setModalVisible(false);
      dispatch(addUserToRecords(value));
    }
    validation();
  };

  function validation() {
    setNameError('');
    setEmailError('');
    setMobileNoError('');
    setDepartmentError('');
    //--------------------Name validation--------------------///////////////
    if (name === '') {
      setNameError('*Cannot be blank');
    } else if (!name.match(/^[A-Z]/)) {
      setNameError('*First character should be a Capital Letter');
    }
    if (name.length > 35) {
      setNameError("*Name is too long,shouldn't be more than 35 characters");
    }
    if (name.startsWith(' ')) {
      setNameError('*First character cannot be blank');
    } else if (name.endsWith(' ')) {
      setNameError('*Last character cannot be blank');
    }
    //--------------------Email validation--------------------///////////////
    if (email === '') {
      setEmailError('*Email cannot be blank');
    } else if (!email.match(/@/)) {
      setEmailError('*Please include an @ in email address');
    } else if (email.startsWith(`@`)) {
      setEmailError('*Please enter any character before @, eg: abc@');
    } else if (
      !email.match(/([A-Za-z0-9\\_\\-\\.]+)@([a-zA-Z0-9]+)\.+([a-zA-Z]+)/)
    ) {
      setEmailError('*Invalid Email');
    }
    if (email.length > 50) {
      setEmailError("*Email is too long,shouldn't exceed 50 characters");
    }

    ////-------Validating Phone number---------------///
    if (mobileNo === '') {
      setMobileNoError('*Cannot be blank');
    } else if (!mobileNo.match(/\d/)) {
      setMobileNoError('*It cannot be other than number');
    } else if (mobileNo.length !== 10) {
      setMobileNoError('*Phone Number should be of 10 digits');
    }

    ////-------Validating Department---------------///
    if (department === '') {
      setDepartmentError('*Cannot be blank');
    } else if (!department.match(/^[A-Z]/)) {
      setDepartmentError('*First character should be a Capital Letter');
    }
    if (department.length > 35) {
      setDepartmentError(
        "*department is too long,shouldn't be more than 35 characters",
      );
    }
    if (department.startsWith(' ')) {
      setDepartmentError('*First character cannot be blank');
    } else if (department.endsWith(' ')) {
      setDepartmentError('*Last character cannot be blank');
    }
  }

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
        <Text style={{color: 'red'}}>{nameError}</Text>
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
        <Text style={{color: 'red'}}>{emailError}</Text>
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
        <Text style={{color: 'red'}}>{departmentError}</Text>
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
        <Text style={{color: 'red'}}>{mobileNoError}</Text>
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
