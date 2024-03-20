import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface HostInfoProps {
  hostName: string;
  hostImage: any;
}

const HostInfo: React.FC<HostInfoProps> = ({hostName, hostImage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image source={{uri: hostImage}} style={styles.hostImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.hostTitle}>Host:</Text>
          <Text>{hostName}</Text>
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
});
