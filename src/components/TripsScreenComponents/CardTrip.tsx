import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type Props = {
  place: string;
  host: string;
  propertyId: string;
  img?: string;
};

export default function CardTrip({place, host, propertyId, img}: Props) {
  const [hostName, setHostName] = useState('');

  useEffect(() => {
    firebase()
      .collection('users')
      .doc(host)
      .get()
      .then(query => {
        const data = query.data();
        setHostName(data?.name);
      });

    // firebase()
    //   .collection('properties')
    //   .doc(propertyId)
    //   .collection('resevations')
    //   .where('idGuest', '==', auth().currentUser?.uid)
    //   .get()
    //   .then();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: img,
        }}
      />

      <View style={styles.tripInformationContainer}>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.host}>Anfitrión: {hostName}</Text>
        <Text style={styles.date}>{propertyId}</Text>
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
