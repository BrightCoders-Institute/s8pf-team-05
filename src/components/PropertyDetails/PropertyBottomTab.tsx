// En tu componente PropertyBottomTab.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PropertyBottomTabProps {
  pricePerNight: string;
  onReservePress: () => void;
}

const PropertyBottomTab: React.FC<PropertyBottomTabProps> = ({ pricePerNight, onReservePress }) => {
  return (
    <View style={styles.container}>
        <View style={styles.priceContainer}>
            <Text style={styles.pricePerNight}>{pricePerNight}</Text>
            <Text style={styles.perNightText}>por noche</Text>
        </View>
            
        <TouchableOpacity style={styles.reserveButton} onPress={onReservePress}>
            <Text style={styles.reserveButtonText}>Reservar</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricePerNight: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  perNightText: {
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
  },
  reserveButton: {
    backgroundColor: '#6F2DBD',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PropertyBottomTab;
