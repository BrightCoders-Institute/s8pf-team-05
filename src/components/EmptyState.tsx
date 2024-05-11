import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EmptyState = ({ imageSource, message, style }: { imageSource: any, message: string, style?: {} }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={imageSource}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: '25%',
  },
  message: {
    marginTop: 20,
    paddingHorizontal: 60,
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
});

export default EmptyState;
