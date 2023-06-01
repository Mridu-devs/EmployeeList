import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from './app/components/Header';
import Form from './app/components/SignUpForm';
import UserInfoCard from './app/components/UserInfoCard';
import Footer from './app/components/Footer';
import {Provider} from 'react-redux/';
import {myStore} from './app/redux/store';
import Homepage from './app/screens/Homepage';

function App() {
  return (
    <Provider store={myStore}>
      <Homepage />
    </Provider>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(193, 193, 193)',
    flex: 1,
    // height: '100%',
    // width: '100%',
    // color: 'black',
  },
});
