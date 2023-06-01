import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserInfoCard from '../components/UserInfoCard';

function Homepage(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Header />
        <UserInfoCard />
      </View>
      <View style={{justifyContent: 'flex-end', marginBottom: 20}}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgb(193, 193, 193)',
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Homepage;
