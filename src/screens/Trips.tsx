/* eslint-disable */
import {StyleSheet, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardTrip from '../components/TripsScreenComponents/CardTrip';
import EmptyState from '../components/EmptyState';
import firebase, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Trips = () => {
  const [reservations, setReservations] = useState<any[]>([]);

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

  //console.log(reservations);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Next trips</Text>

      {reservations.length === 0 ? (
        <EmptyState
          imageSource={require('../images/empty-state-properties-list.png')}
          message="You haven't rented any property yet."
        />) : (
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
          })
        )
      }

      {/* <Text style={styles.subTitle}>Trips you made</Text>

      {[instertar aqui variable de 'VIAJES PASADOS' a mapear].map((trip, index) => {
        return (
          <CardTrip
            key={index}
            place={trip.place}
            host={trip.host}
            date={trip.date}
          />
        );
      })} */}
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    color: '#444444',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
});

export default Trips;
