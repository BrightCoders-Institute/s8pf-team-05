import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import HeaderNavigation from '../navigation/HeaderNavigation';
import CloseButton from '../components/Date/CloseButton';
import Input from '../components/HostModeInactive/Input';
import CommentBox from '../components/ConfirmReservation/CommentBox';
import Button from '../components/ConfirmReservation/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputDate from '../components/HostModeInactive/InputDate';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Profilepicture from '../components/personalInfo/Profilepicture';
import {launchImageLibrary} from 'react-native-image-picker';
import LoadingComponent from '../components/LoadingComponent';
import {useNavigation} from '@react-navigation/native';

const HostModeInactiveScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [msgAlertPhoneNumber, setMsgAlertPhoneNumber] = useState('');
  const [msgAlertBirthday, setMsgAlertBirthday] = useState('');
  const [msgAlertDescription, setMsgAlertDescription] = useState('');
  const [msgAlertPhoto, setMsgAlertPhoto] = useState('');
  const [loading, setLoading] = useState(false);

  const [imgUser, setImgUser] = useState<string>('');
  const [previousImage, setPreviousImage] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [aboutYou, setAboutYou] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    async function getInfoUser() {
      const data = await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .get();
      const user = data.data();
      if (user?.profileImage !== '') {
        setImgUser(user?.profileImage);
        setPreviousImage(true);
      }
      setPhone(user?.phoneNumber);
    }
    getInfoUser();
  }, []);

  const handleAddImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (!result.didCancel) {
        const {assets} = result;
        const newImage = assets.map(asset => asset.uri);
        setImgUser(newImage[0]);
        setPreviousImage(false);
      }
    } catch (error) {
      console.error('Error selecting images: ', error);
    }
  };

  const handleSendRequest = async () => {
    // Lógica para enviar la solicitud
    handlePhoneChange();
    handleDateChange();
    handleDescriptionChange();
    handlePhotoChange();

    if (
      phone.length === 10 &&
      birthDay !== '' &&
      aboutYou.length > 10 &&
      imgUser !== ''
    ) {
      hideModal();
      setLoading(true);

      if (!previousImage) {
        const imageName = 'userImageProfile';
        const imageRef = storage().ref(
          `users/${auth().currentUser?.uid}/${imageName}`,
        );

        await imageRef.putFile(imgUser);
        const imageUrl = await imageRef.getDownloadURL();

        firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .update({
            birthday: birthDay,
            description: aboutYou,
            phoneNumber: phone,
            profileImage: imageUrl,
            HostMode: true,
          })
          .then(() => {
            Alert.alert('Success', 'Information Correctly Updated');
            navigation.navigate('Main');
          });
      } else {
        firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .update({
            birthday: birthDay,
            description: aboutYou,
            phoneNumber: phone,
            HostMode: true,
          })
          .then(() => {
            Alert.alert('Success', 'Information Correctly Updated');
            navigation.navigate('Main');
          });
      }
    }
  };

  const handlePhoneChange = () => {
    if (phone.length === 10) {
      setMsgAlertPhoneNumber(''); // Limpiar el mensaje de error
    } else {
      setMsgAlertPhoneNumber('The phone must have 10 numbers');
    }
  };

  const handleDateChange = () => {
    if (birthDay !== '') {
      setMsgAlertBirthday(''); // Limpiar el mensaje de error
    } else {
      setMsgAlertBirthday('Select a Date');
    }
  };

  const handleDescriptionChange = () => {
    if (aboutYou.length > 10) {
      setMsgAlertDescription(''); // Limpiar el mensaje de error
    } else {
      setMsgAlertDescription(
        'Your description must be longer than 10 characters',
      );
    }
  };

  const handlePhotoChange = () => {
    if (imgUser !== '') {
      setMsgAlertPhoto(''); // Limpiar el mensaje de error
    } else {
      setMsgAlertPhoto('Add photo');
    }
  };

  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setBirthDay(date.toLocaleDateString());
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <HeaderNavigation whereNav="Main" />
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <ScrollView>
                <CloseButton onPress={hideModal} />

                <Text style={styles.titleInput}>Photo</Text>
                <View style={styles.photoConatainer}>
                  <Profilepicture onPress={handleAddImages} imgUser={imgUser} />
                  <Text style={styles.textAlert}>{msgAlertPhoto}</Text>
                </View>

                <Input
                  title="Phone Number"
                  placeholder="Enter your phone number"
                  value={phone}
                  msgError={msgAlertPhoneNumber}
                  maxLength={10}
                  keyBoardType="phone-pad"
                  onChangeText={value => {
                    setPhone(value);
                  }}
                />

                <InputDate
                  style={styles.inputFecha}
                  msgError={msgAlertBirthday}
                  content={selectedDate?.toLocaleDateString()}
                  onPress={() => setDatePickerVisibility(true)}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <CommentBox
                  title="About You"
                  placeholder="Write something about you..."
                  msgError={msgAlertDescription}
                  onChangeText={value => {
                    setAboutYou(value);
                  }}
                />

                <Button
                  text="Send form"
                  style={styles.btnForm}
                  onPress={() => {
                    handleSendRequest();
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Text style={styles.title}>Host Mode Disabled</Text>
        <Text style={styles.subtitle}>
          Do you want to submit a request to activate host mode for your
          account?
        </Text>
        <TouchableOpacity style={styles.button} onPress={hideModal}>
          <Text style={styles.buttonText}>Send request</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  photoConatainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444444',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7C7C7C',
  },
  button: {
    backgroundColor: '#6F2DBD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    marginTop: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputFecha: {
    marginBottom: 30,
  },
  titleInput: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textAlert: {
    color: 'red',
  },
  btnForm: {
    marginTop: 25,
  },
});

export default HostModeInactiveScreen;
