import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  KeyboardTypeOptions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import CloseButton from '../Date/CloseButton';
import Input from '../HostModeInactive/Input';
import InputDate from '../HostModeInactive/InputDate';

type ContentModal = {
  title: string;
  value: string;
  campo: string;
  maxLength: number;
  keyBoardType: KeyboardTypeOptions;
};

type Props = {
  content: Array<ContentModal>;
  onPressModal: () => void;
  onPressOut: () => void;
};

export default function EditModal({onPressOut, onPressModal, content}: Props) {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [inputValues, setInputValues] = useState<Record<string, string>>(
    content.reduce((acc, cur) => ({...acc, [cur.campo]: cur.value}), {}),
  );

  useEffect(() => {
    // Check if any input value is different from the default value
    const hasDifferentValue = Object.keys(inputValues).some(
      key =>
        inputValues[key] !== content.find(item => item.campo === key)?.value,
    );
    // Update button disabled state based on the condition
    setDisabledBtn(!hasDifferentValue);
  }, [inputValues, content]);

  const handleInputChange = (campo: string, text: string) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [campo]: text,
    }));
  };

  const handleConfirm = (date: Date) => {
    console.log('You selected the date: ' + date.toLocaleDateString());
    handleInputChange('birthday', date.toLocaleDateString());
    // setSelectedDate(date);
    // setBirthDay(date.toLocaleDateString());
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function updateData() {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .update(inputValues)
      .then(() => {
        onPressOut();
      });
  }

  console.log(inputValues);

  return (
    <Pressable onPress={onPressOut} style={styles.container}>
      <Pressable style={styles.modal}>
        <CloseButton onPress={onPressModal} />

        <FlatList
          data={content}
          renderItem={({item}) =>
            item.campo === 'birthday' ? (
              <InputDate
                onPress={() => setDatePickerVisibility(true)}
                content={inputValues[item.campo]}
              />
            ) : (
              <Input
                title={item.title}
                value={inputValues[item.campo]}
                maxLength={item.maxLength}
                keyBoardType={item.keyBoardType}
                onChangeText={text => handleInputChange(item.campo, text)}
              />
            )
          }
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity disabled={disabledBtn} onPress={updateData}>
          <View style={disabledBtn ? styles.btnSaveDisabled : styles.btnSave}>
            <Text style={styles.txtBtn}>Save</Text>
          </View>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  btnSave: {
    backgroundColor: '#6F2DBD',
    borderRadius: 15,
    padding: 10,
    marginVertical: 20,
  },
  btnSaveDisabled: {
    backgroundColor: '#8B8B8B',
    borderRadius: 15,
    padding: 10,
    marginVertical: 20,
  },
  txtBtn: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
