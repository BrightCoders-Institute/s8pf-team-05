import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/firestore';

type Props = {
  propertyName: string;
  hostId: string;
  date_of_arrival: Date;
  departure_date: Date;
  img: string;
  onPress?: () => void;
};

export default function CardTrip({
  propertyName,
  hostId,
  date_of_arrival,
  departure_date,
  img,
  onPress,
}: Props) {
  const [hostName, setHostName] = useState('');

  useEffect(() => {
    firebase()
      .collection('users')
      .doc(hostId)
      .get()
      .then(query => {
        const data = query.data();
        setHostName(data?.name);
      });
  }, []);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: img,
          }}
        />

        <View style={styles.tripInformationContainer}>
          <Text style={styles.place}>{propertyName}</Text>
          <Text style={styles.host}>Anfitrión: {hostName}</Text>
          <Text style={styles.date}>
            {date_of_arrival.toDateString()} - {departure_date.toDateString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  tripInformationContainer: {
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
