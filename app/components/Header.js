import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Form from './Form';

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntIcon name="pluscircleo" size={40} color={'white'} />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <View style={styles.modalContent}>
                <Form setModalVisible={setModalVisible} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
