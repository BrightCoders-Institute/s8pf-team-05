import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color={'#47C6E6'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default LoadingComponent;
