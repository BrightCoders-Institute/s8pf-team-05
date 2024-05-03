import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HostInfoProps {
  hostName: string;
  hostImage: string; 
}

const HostInfo: React.FC<HostInfoProps> = ({ hostName, hostImage }) => {
  return (
    <View style={styles.hostInfoContainer}>
      <View style={styles.container}>
        <Image source={{uri: hostImage}} style={styles.hostImage} testID="host-image"/>
        <View>
          <Text style={styles.hostTitle}>Host:</Text>
          <Text style={styles.hostName}>{hostName}</Text>
        </View>

      </View>
      <View style={styles.horizontalLine}>

      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  hostImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  hostName: {
    fontSize: 15,
    color: '#7C7C7C',
  },
  hostTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  hostInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#A7A7A7',
    marginTop: 10,
  },
});

export default HostInfo;
