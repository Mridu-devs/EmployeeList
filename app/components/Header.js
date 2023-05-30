import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <AntIcon name="pluscircleo" size={40} color={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(8, 86, 58, 0.876)',
    width: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
});
