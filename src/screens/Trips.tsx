import {StyleSheet, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardTrip from '../components/TripsScreenComponents/CardTrip';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
  }, []);

  const pastTrips = reservations?.filter(reservation => {
    const currentDate = new Date();
    const departureDate = new Date(reservation.departure_date.seconds * 1000);
    return currentDate > departureDate;
  });

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>Next trips</Text>

          {reservations !== undefined &&
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
            })}

          {pastTrips.length > 0 && (
            <>
              <Text style={styles.subTitle}>Trips you made</Text>
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
            </>
          )}
        </>
      )}
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
