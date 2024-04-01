import {StyleSheet, Text, View, KeyboardTypeOptions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Profilepicture from '../components/personalInfo/Profilepicture';
import InfoPersonal from '../components/personalInfo/InfoPersonal';
import HeaderNavigation from '../navigation/HeaderNavigation';
import EditModal from '../components/personalInfo/EditModal';
import {launchImageLibrary} from 'react-native-image-picker';
import LoadingComponent from '../components/LoadingComponent';

type ContentModal = {
  title: string;
  value: string;
  campo: string;
  maxLength: number;
  keyBoardType: KeyboardTypeOptions;
};

const PersonalInformation = () => {
  const [infoUser, setInfoUser] = useState({
    name: '',
    lastname: '',
    profileImage: '',
    birthday: '',
    phoneNumber: '',
    description: '',
    HostMode: null,
  });

  const [contentModal, setContentModal] = useState(Array<ContentModal>);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(documentSnapshot => {
        const dataUser = documentSnapshot.data();
        setInfoUser({
          name: dataUser?.name,
          lastname: dataUser?.lastname,
          profileImage: dataUser?.profileImage,
          birthday: dataUser?.birthday,
          phoneNumber: dataUser?.phoneNumber,
          description: dataUser?.description,
          HostMode: dataUser?.HostMode,
        });
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [auth().currentUser?.uid]);

  const handleAddImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (!result.didCancel) {
        setLoading(true);
        const {assets} = result;
        const newImage = assets?.map(asset => asset.uri);

        const imageName = 'userImageProfile';
        const imageRef = storage().ref(
          `users/${auth().currentUser?.uid}/${imageName}`,
        );
        await imageRef.putFile(newImage[0]);
        const imageUrl = await imageRef.getDownloadURL();

        firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .update({profileImage: imageUrl})
          .then(() => {
            setLoading(false);
            Alert.alert('Success', 'Information Correctly Updated');
          });
      }
    } catch (error) {
      console.error('Error selecting images: ', error);
    }
  };

  return (
    <>
      {loading && <LoadingComponent />}
      {showModal && (
        <EditModal
          content={contentModal}
          onPressOut={() => setShowModal(false)}
          onPressModal={() => setShowModal(false)}
        />
      )}
      <View style={styles.container}>
        <HeaderNavigation whereNav="Profile" />
        <Text style={styles.text}>Personal information</Text>
        <View style={styles.profile}>
          <Profilepicture
            imgUser={infoUser.profileImage}
            onPress={handleAddImages}
          />
        </View>
        <InfoPersonal
          name="Legal Name"
          value={infoUser.name + ' ' + infoUser.lastname}
          action="Editar"
          onPress={() => {
            setShowModal(true);
            setContentModal([
              {
                title: 'Name',
                value: infoUser.name,
                campo: 'name',
                maxLength: 50,
                keyBoardType: 'default',
              },
              {
                title: 'Last Name',
                value: infoUser.lastname,
                campo: 'lastname',
                maxLength: 50,
                keyBoardType: 'default',
              },
            ]);
          }}
        />
        <InfoPersonal
          name="Phone Number"
          value={
            infoUser.phoneNumber !== ''
              ? '*** *** ' + infoUser.phoneNumber.substring(6)
              : 'Not provided'
          }
          action={infoUser.phoneNumber !== '' ? 'Editar' : 'Provide'}
          onPress={() => {
            setShowModal(true);
            setContentModal([
              {
                title: 'Phone',
                value: infoUser.phoneNumber,
                campo: 'phoneNumber',
                maxLength: 10,
                keyBoardType: 'phone-pad',
              },
            ]);
          }}
        />

        {/* Aparecen después de ser Host */}
        {infoUser.HostMode && (
          <View>
            <InfoPersonal
              name="Date of birth"
              value={infoUser.birthday}
              action="Editar"
              onPress={() => {
                setShowModal(true);
                setContentModal([
                  {
                    title: 'Date of birth',
                    value: infoUser.birthday,
                    campo: 'birthday',
                    maxLength: 10,
                    keyBoardType: 'phone-pad',
                  },
                ]);
              }}
            />
            <InfoPersonal
              name="About You"
              value={infoUser.description}
              action="Editar"
              onPress={() => {
                setShowModal(true);
                setContentModal([
                  {
                    title: 'About You',
                    value: infoUser.description,
                    campo: 'description',
                    maxLength: 100,
                    keyBoardType: 'default',
                  },
                ]);
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    marginTop: '80%',
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
  btnModal: {
    marginTop: 40,
  },
});
