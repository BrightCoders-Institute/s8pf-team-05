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
import {
  useNavigation,
  useIsFocused,
  StackActions,
} from '@react-navigation/native';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import { document } from 'dom';

export default function ConfirmReservation({route}: any) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {property} = route.params;

  const [dates, setDates] = useState({
    startDate: new Date(),
    startParseDate: '',
    endDate: new Date(),
    endParseDate: '',
  });
  const [numberOfNights, setNumberOfNights] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Mostrar el modal solo si estamos en la pantalla principal
        if (isFocused) {
          setShowModal(true);
          return true;
        }
        return false; // Permitir que el botón de retroceso actúe normalmente si no estamos en la pantalla principal
      },
    );

    const dateStart = new Date(property.startDate);
    const dateEnd = new Date(property.endDate);

    let diff = dateEnd.getTime() - dateStart.getTime();

    setNumberOfNights(diff / (1000 * 60 * 60 * 24));
    setDates({
      startDate: dateStart,
      startParseDate: dateStart.toDateString(),
      endDate: dateEnd,
      endParseDate: dateEnd.toDateString(),
    });

    return () => backHandler.remove();
  }, [isFocused]);

  function requestReservation() {
    setLoading(true);
    firebase()
      .collection('properties')
      .doc(property.id)
      .collection('reservations')
      .add({
        idGuest: auth().currentUser?.uid,
        date_of_arrival: dates.startDate,
        departure_date: dates.endDate,
        guestKids: property.guestKids,
        guestAdults: property.guestAdults,
        chatId: null,
      })
      .then(data => {
        const reservationId = data.id;
        const chatUsers = [auth().currentUser?.uid, property.hostId]; // Agregar usuarios al chat
        const reservationDetails = {
          propertyName: property.name,
          startDate: dates.startDate,
          endDate: dates.endDate,
          propertyId: property.id, 
          reservationId: reservationId, 
        };
        firebase()
          .collection('chats')
          .add({ users: chatUsers, reservationDetails })
          .then(chatRef => {
            // Chat sent
            const comment = 'Reservation Comment: ' + commentText; // Agregar comentario automático
            firebase()
              .collection('chats')
              .doc(chatRef.id)
              .collection('messages')
              .add({
                _id: new Date().getTime().toString(),
                createdAt: new Date(),
                text: comment,
                user: { _id: auth().currentUser?.uid },
              })
              const chatId = chatRef.id
              firebase()
              .collection('properties')
              .doc(property.id)
              .collection('reservations')
              .doc(reservationId)
              .update({ chatId: chatId })
              .then(() => {
                async function getPath() {
                  const path = await data.get();
                  firebase()
                    .collection('users')
                    .doc(auth().currentUser?.uid)
                    .collection('reservations')
                    .add({
                      propertyReservationReference: path.ref,
                      propertyDataReference: firebase()
                        .collection('properties')
                        .doc(property.id),
                    })
                    .then(() => {
                      setLoading(false);
                      navigation.dispatch(
                        StackActions.replace('ReservationCompleted'),
                      );
                    });
                }
                getPath();
              });
          });
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
          onPressLeave={() => navigation.dispatch(StackActions.replace('Main'))}
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

          <Text style={styles.title}>Your Trip</Text>
          <DetailsReservation
            title="Date"
            info={`${dates.startParseDate.substring(
              4,
              11,
            )} -  ${dates.endParseDate.substring(4, 11)}`}
            btnEditar={() => navigation.navigate('DateSelect', {property})}
          />
          <DetailsReservation
            title="Guests"
            info={
              property.guestKids +
              property.guestAdults +
              (property.guestAdults + property.guestKids > 1
                ? ' Guests'
                : ' Guest')
            }
            btnEditar={() => navigation.navigate('GuestSelect', {property})}
          />

          {/* Line */}
          <View style={styles.line1} />

          <Text style={styles.title}>Write to the host</Text>
          <Text style={styles.description}>
            Tell him why you are traveling, who is accompanying you and what you
            like most about the place
          </Text>
          <HostInfo hostId={property.hostId} />
          <CommentBox 
            placeholder="Write a comment here..." 
            onChangeText={(text: string) => setCommentText(text)} // Save the comment
            onSend={() => {
              // Send the comment
              const comment = commentText.trim();
              if (comment) {
                onSend([{ text: comment }]); 
                setCommentText(''); 
              }
            }}
          />

          {/* Line */}
          <View style={[styles.line1, styles.line2]} />

          <Text style={styles.title}>Price Details</Text>

          <Text style={styles.price}>
            {numberOfNights} {numberOfNights > 1 ? 'Nights' : 'Night'} x $
            {property.price}
          </Text>

          {/* Line */}
          <View style={[styles.line1, styles.line3]} />

          <Text style={styles.subTitle}>Total</Text>
          <Text style={styles.totalPrice}>
            ${numberOfNights * property.price}
          </Text>

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
    color: '#7C7C7C',
  },
  line1: {
    marginTop: 25,
    height: 2,
    paddingHorizontal: -100,
    backgroundColor: '#CDCDCD',
  },
  line2: {
    marginTop: 5,
  },
  line3: {
    marginTop: 5,
    marginHorizontal: 6,
    height: 1,
  },
  title: {
    marginTop: 25,
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  description: {
    color: '#444444',
    fontSize: 17,
    fontWeight: '600',
  },
  price: {
    color: '#7C7C7C',
    fontSize: 15,
    marginVertical: 5,
  },
  totalPrice: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 30,
  },
  subTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 7,
  },
  description: {
    color: '#7C7C7C',
  },
  writeDescrption: {
    color: '#999898',
  },
});
