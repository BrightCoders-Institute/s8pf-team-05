import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface HostInfoProps {
  hostId: string;
}

const HostInfo: React.FC<HostInfoProps> = ({hostId}) => {
  const [hostInfo, setHostInfo] = useState({
    hostName: '',
    profileImage: '',
  });

  useEffect(() => {
    async function getInfoUser() {
      const doc = await firestore().collection('users').doc(hostId).get();
      const userData = doc.data();

      if (userData) {
        const {name, lastname, profileImage} = userData;
        const hostName = name + ' ' + lastname;
        setHostInfo({hostName, profileImage});
      }
    }
    getInfoUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={
            hostInfo.profileImage === ''
              ? require('../../source/defaultUserImage.jpg')
              : {uri: hostInfo.profileImage}
          }
          style={styles.hostImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.hostTitle}>Host:</Text>

          <Text>{hostInfo.hostName}</Text>
        </View>
      </View>
    </View>
  );
};

export default HostInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: -5,
    flexDirection: 'row',
  },
  infoContainer: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  hostImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  hostTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  hostName: {
    fontSize: 15,
    color: '#7C7C7C',
  },
});
