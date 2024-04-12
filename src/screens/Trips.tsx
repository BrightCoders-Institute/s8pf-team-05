import {StyleSheet, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardTrip from '../components/TripsScreenComponents/CardTrip';
import firebase, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DATA = [
  {
    id: '1',
    place: 'Manzanillo',
    host: 'Arturo',
    date: '22 de febrero de 2022 - 24 de febrero de 2022',
  },
];

const DATA2 = [
  {
    id: '1',
    place: 'Manzanillo',
    host: 'Arturo',
    date: '22 de febrero de 2022 - 24 de febrero de 2022',
  },
  {
    id: '2',
    place: 'Colima',
    host: 'Jose',
    date: '10 de marzo de 2022 - 21 de marzo de 2022',
  },
  {
    id: '3',
    place: 'Guadalajara',
    host: 'Pancha',
    date: '5 de julio de 2022 - 8 de julio de 2022',
  },
];

const Trips = () => {
  const [reservations, setReservations] = useState<any[]>();

  useEffect(() => {
    async function fetchReservations() {
      const querySnapshot = await firebase()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .collection('reservations')
        .get();

      const tmpReservations: any[] = [];

      await Promise.all(
        querySnapshot.docs.map(async doc => {
          const idProperty =
            doc.data().propertyReference._documentPath._parts[1];
          const propertyDoc = await firebase()
            .collection('properties')
            .doc(idProperty)
            .get();

          tmpReservations.push({
            id: propertyDoc.id,
            ...propertyDoc.data(),
          });
        }),
      );

      setReservations(tmpReservations);
    }

    fetchReservations();
  }, []);

  console.log(reservations);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trips</Text>

      {reservations !== undefined &&
        reservations.map((reservation, index) => {
          return (
            <CardTrip
              key={index}
              place={reservation.propertyName}
              host={reservation.hostId}
              date={reservation.id}
              img={reservation.images[0]}
            />
          );
        })}

      <Text style={styles.subTitle}>Viajes Pasados</Text>

      {DATA2.map((trip, index) => {
        return (
          <CardTrip
            key={index}
            place={trip.place}
            host={trip.host}
            date={trip.date}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 10,
    paddingVertical: 20,
  },
  title: {
    color: '#444444',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    color: '#444444',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
});

export default Trips;
