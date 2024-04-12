import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Button} from 'react-native';
import HeaderNavigation from '../../navigation/HeaderNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  showModal: boolean;
  onPressCancel: () => void;
  onPressLeave: () => void;
  onPressExit: () => void;
};

export default function Header({
  showModal,
  onPressCancel,
  onPressLeave,
  onPressExit,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Icon
          name="close-outline"
          size={30}
          color={'black'}
          onPress={onPressExit}
        />
        <Text style={styles.title}>Solicitar Confirmación</Text>
      </View>

      {/* Linea */}
      <View style={styles.line} />

      <Modal animationType="fade" visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.cardAlert}>
            <Text style={styles.titleModal}>
              Are you sure you want to leave?
            </Text>
            <Text style={styles.subtitleModal}>
              All changes will be discarded
            </Text>

            <View style={styles.btnContainer}>
              <Button title="Leave" onPress={onPressLeave} />
              <Button title="Cancel" onPress={onPressCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    marginTop: 10,
    height: 2,
    marginHorizontal: -100,
    backgroundColor: '#CDCDCD',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAlert: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
  },
  titleModal: {
    textAlign: 'center',
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitleModal: {
    textAlign: 'center',
    fontSize: 15,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
