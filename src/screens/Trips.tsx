/* eslint-disable */
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardTrip from '../components/TripsScreenComponents/CardTrip';
import EmptyState from '../components/EmptyState';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';

const Trips = () => {
  const isFocused = useIsFocused();

  const [reservations, setReservations] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [somePastTrip, setSomePastTrip] = useState('');

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservationsRef = await firebase()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .collection('reservations')
          .get();

        const tmpReservations: any[] = [];

        await Promise.all(
          reservationsRef.docs.map(async doc => {
            const propertyReservationRef =
              doc.data().propertyReservationReference;
            const propertyDataRef = doc.data().propertyDataReference;

            const propertyReservationDoc = await propertyReservationRef.get();
            const propertyReservationData = propertyReservationDoc.data();

            const propertyDataDoc = await propertyDataRef.get();
            const propertyDataData = propertyDataDoc.data();

            tmpReservations.push({
              propertyName: propertyDataData.propertyName,
              images: propertyDataData.images[0],
              hostId: propertyDataData.hostId,
              date_of_arrival: propertyReservationData.date_of_arrival,
              departure_date: propertyReservationData.departure_date,
            });
          }),
        );

        setReservations(tmpReservations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    }

    fetchReservations();
  }, [isFocused]);

  const pastTrips = reservations?.filter(reservation => {
    const currentDate = new Date();
    const departureDate = new Date(reservation.departure_date.seconds * 1000);
    return currentDate > departureDate;
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Next trips</Text>
          <ScrollView>
          {reservations.length === 0 ? (
            <EmptyState
              imageSource={require('../images/empty-state-properties-list.png')}
              message="You haven't rented any property yet."
          />) : (
            reservations.map((reservation, index) => {
              const currentDate = new Date();
              const departureDate = new Date(
                reservation.departure_date.seconds * 1000,
              );

              // Verificar si la fecha de salida ya ha pasado
              const isDeparturePast = currentDate > departureDate;

              if (!isDeparturePast) {
                return (
                    <CardTrip
                      key={index}
                      propertyName={reservation.propertyName}
                      img={reservation.images}
                      hostId={reservation.hostId}
                      date_of_arrival={
                        new Date(reservation.date_of_arrival.seconds * 1000)
                      }
                      departure_date={
                        new Date(reservation.departure_date.seconds * 1000)
                      }
                    />
                );
              }
            })
          )}
          </ScrollView>

          {pastTrips.length > 0 && (
            <>
              <Text style={styles.subTitle}>Trips you made</Text>
              <ScrollView>
                {pastTrips?.map((reservation, index) => (
                  <CardTrip
                    key={index}
                    propertyName={reservation.propertyName}
                    img={reservation.images}
                    hostId={reservation.hostId}
                    date_of_arrival={
                      new Date(reservation.date_of_arrival.seconds * 1000)
                    }
                    departure_date={
                      new Date(reservation.departure_date.seconds * 1000)
                    }
                  />
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Trips;
