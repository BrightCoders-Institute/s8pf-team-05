import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NumericInput from '../components/HostMode/NumericInput';

const HostModeScreen: React.FC = () => {
  const [guests, setGuests] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState(0);
  const [beds, setBeds] = React.useState(0);
  const [bathrooms, setBathrooms] = React.useState(0);
  const [propertyName, setPropertyName] = React.useState('');
  const [propertyLocation, setPropertyLocation] = React.useState('');
  const [propertyDescription, setPropertyDescription] = React.useState('');
  const [propertyImages, setPropertyImages] = React.useState<string[]>([]);

  const handleIncrease = (setState: React.Dispatch<React.SetStateAction<number>>) => {
    setState(prevValue => prevValue + 1);
  };

  const handleDecrease = (setState: React.Dispatch<React.SetStateAction<number>>) => {
    setState(prevValue => Math.max(0, prevValue - 1));
  };

  const handleAddImages = () => {
    // Implementar la lógica para agregar imágenes
  };

  const handleAddProperty = () => {
    // Implementar la lógica para agregar la propiedad
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add a new property</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={propertyName}
              onChangeText={setPropertyName}
              placeholder="Property name"
              placeholderTextColor={'#7C7C7C'}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={propertyLocation}
              onChangeText={setPropertyLocation}
              placeholder="Property location"
              placeholderTextColor={'#7C7C7C'}
            />
          </View>

          {/* Resto de los campos de entrada numérica */}
          <NumericInput
            label="Number of guests"
            value={guests}
            onIncrease={() => handleIncrease(setGuests)}
            onDecrease={() => handleDecrease(setGuests)}
          />
          <NumericInput
            label="Number of rooms"
            value={bedrooms}
            onIncrease={() => handleIncrease(setBedrooms)}
            onDecrease={() => handleDecrease(setBedrooms)}
          />
          <NumericInput
            label="Number of beds"
            value={beds}
            onIncrease={() => handleIncrease(setBeds)}
            onDecrease={() => handleDecrease(setBeds)}
          />
          <NumericInput
            label="Number of bathrooms"
            value={bathrooms}
            onIncrease={() => handleIncrease(setBathrooms)}
            onDecrease={() => handleDecrease(setBathrooms)}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.textArea]}
              value={propertyDescription}
              onChangeText={setPropertyDescription}
              placeholder="Property description"
              placeholderTextColor={'#7C7C7C'}
              multiline
            />
            <View style={styles.line} />
          </View>

          {/* Botón para agregar imágenes */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddImages}>
            <Text style={styles.addButtonText}>Add Images</Text>
            <Icon name="attach" size={30} color="gray" />
          </TouchableOpacity>

          {/* Botón para agregar la propiedad */}
          <TouchableOpacity style={styles.addPropertyButton} onPress={handleAddProperty}>
            <Text style={styles.addPropertyButtonText}>Add property</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#444444',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    height: 40,
    color: '#000000',
    borderColor: '#DBDADA',
    borderBottomWidth: 1.5,
    paddingHorizontal: 5,
    flex: 1,
  },
  textArea: {
    marginTop: 20,
    width: '100%',
    height: 100,
    color: '#000000',
    borderColor: '#DBDADA',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  line: {
    height: 1,
    backgroundColor: '#DBDADA',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderColor: '#DBDADA',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 190,
    marginVertical: 15,
  },
  addButtonText: {
    marginRight: 10,
    color: '#7C7C7C',
  },
  addPropertyButton: {
    backgroundColor: '#6F2DBD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 25,
    marginHorizontal: 15,
  },
  addPropertyButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    
  },
});

export default HostModeScreen;
