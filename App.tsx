import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Header from './app/components/Header';
import Form from './app/components/Form';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* <Form /> */}
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(193, 193, 193)',
    height: '100%',
    width: '100%',
    color: 'black',
  },
});
