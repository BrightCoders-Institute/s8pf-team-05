import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import Header from '../components/ConfirmReservation/Header';
import Ranking from '../components/ConfirmReservation/Ranking';
import DetailsReservation from '../components/ConfirmReservation/DetailsReservation';
import HostInfo from '../components/ConfirmReservation/HostInfo';
import CommentBox from '../components/ConfirmReservation/CommentBox';
import Button from '../components/ConfirmReservation/Button';
import LoadingComponent from '../components/LoadingComponent';
import {useNavigation, StackActions} from '@react-navigation/native';
import renderer from 'react-test-renderer';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ConfirmReservation({route}: any) {
  const navigation = useNavigation();
  const {property} = route.params;

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        //setShowModal(true);
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  function requestReservation() {
    setLoading(true);
    firebase()
      .collection('properties')
      .doc(property.id)
      .collection('reservations')
      .add({
        idGuest: auth().currentUser?.uid,
        date_of_arrival: property.startDate,
        departure_date: property.endDate,
        guestKids: property.guestKids,
        guestAdults: property.guestAdults,
      })
      .then(data => {
        async function getPath() {
          const path = await data.get();

          firebase()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .collection('reservations')
            .add({
              propertyReference: path.ref,
            })
            .then(() => {
              setLoading(false);
              navigation.dispatch(StackActions.replace('Main'));
            });
        }
        getPath();
      });
  }

  return (
    <>
      {loading && <LoadingComponent />}
      <View style={styles.container}>
        <Header
          showModal={showModal}
          onPressCancel={() => {
            setShowModal(false);
          }}
          onPressExit={() => setShowModal(true)}
          onPressLeave={() => navigation.navigate('Main')}
        />

        <ScrollView>
          <View style={styles.informationPropertyContainer}>
            <Image
              style={styles.imgProperty}
              source={{
                uri: property.images[0],
              }}
            />
            <View style={styles.textInformationPropertyContainer}>
              <Text style={styles.nameProperty}>{property.name}</Text>
              <Text style={styles.locationProperty}>{property.location}</Text>
              <Ranking idProperty={property.id} />
            </View>
          </View>

          {/* Line */}
          <View style={styles.line1} />

          <Text style={styles.title}>Tu Viaje</Text>
          <DetailsReservation
            title="Fecha"
            info={`${property.startDate.substring(
              4,
              11,
            )} to  ${property.endDate.substring(4, 11)}`}
            btnEditar={() =>
              navigation.dispatch(
                StackActions.replace('DateSelect', {property}),
              )
            }
          />
          <DetailsReservation
            title="Huéspedes"
            info={
              property.guestKids +
              property.guestAdults +
              (property.guestAdults + property.guestKids > 1
                ? ' Guests'
                : ' Guest')
            }
            btnEditar={() =>
              navigation.dispatch(
                StackActions.replace('GuestSelect', {property}),
              )
            }
          />

          {/* Line */}
          <View style={styles.line1} />

          <Text style={styles.title}>Escríbele al anfitrión</Text>
          <Text>
            Cuenta porque viajas, quien te acompaña y que es lo que mas te gusta
            del espacio.
          </Text>
          <HostInfo hostId={property.hostId} />
          <CommentBox placeholder="Escribe aqui tu comentario..." />

          <Button text="Request reservation" onPress={requestReservation} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  informationPropertyContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  imgProperty: {
    width: 143,
    height: 106,
    borderRadius: 20,
  },
  textInformationPropertyContainer: {
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nameProperty: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  locationProperty: {
    fontSize: 14,
  },
  line1: {
    marginTop: 25,
    height: 5,
    paddingHorizontal: -100,
    backgroundColor: '#CDCDCD',
  },
  title: {
    marginTop: 25,
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
});
