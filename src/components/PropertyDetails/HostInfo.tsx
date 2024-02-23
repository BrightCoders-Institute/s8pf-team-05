import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HostInfoProps {
  hostName: string;
  hostImage: any; 
}

const HostInfo: React.FC<HostInfoProps> = ({ hostName, hostImage }) => {
  return (
    <View style={styles.hostInfoContainer}>
      <View style={styles.container}>
        <Image source={hostImage} style={styles.hostImage} />
        <View>
          <Text style={styles.hostTitle}>Anfitrion:</Text>
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
    fontSize: 14,
  },
  hostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 10,
  },
});

export default HostInfo;
