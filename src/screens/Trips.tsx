import {StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';
import CardTrip from '../components/TripsScreenComponents/CardTrip';

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
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trips</Text>

      {DATA.map((trip, index) => {
        return (
          <CardTrip
            key={index}
            place={trip.place}
            host={trip.host}
            date={trip.date}
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
    paddingHorizontal: 30,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  subTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Trips;
