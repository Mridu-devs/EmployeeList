import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AntIcon name="pluscircleo" size={40} color={'white'} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(8, 86, 58, 0.876)',
    height: 100,
  },
});
