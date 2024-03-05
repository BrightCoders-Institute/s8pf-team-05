import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

type Props = {
  place: string;
  host: string;
  date: string;
  img?: string;
};

export default function CardTrip({place, host, date, img}: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/08/minecraft-2442229.jpg?tf=1200x1200',
        }}
      />

      <View style={styles.tripInformationContainer}>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.host}>Anfitrión: {host}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  tripInformationContainer: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'center',
  },
  place: {
    color: '#444444',
    fontSize: 15,
    fontWeight: 'bold',
  },
  host: {
    fontSize: 12,
    color: '#7C7C7C',
  },
  date: {
    fontSize: 11,
    color: '#7C7C7C',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
});
