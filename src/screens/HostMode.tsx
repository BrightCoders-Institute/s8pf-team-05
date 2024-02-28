import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
    // Lógica para agregar imágenes
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir nueva propiedad</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={propertyName}
            onChangeText={setPropertyName}
            placeholder="Nombre de la propiedad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={propertyLocation}
            onChangeText={setPropertyLocation}
            placeholder="Ubicación de la propiedad"
          />
        </View>



        {/* Resto de los campos de entrada numérica */}
        <NumericInput
          label="Numero de huespedes"
          value={guests}
          onIncrease={() => handleIncrease(setGuests)}
          onDecrease={() => handleDecrease(setGuests)}
        />
        <NumericInput
          label="Numero de habitaciones"
          value={bedrooms}
          onIncrease={() => handleIncrease(setBedrooms)}
          onDecrease={() => handleDecrease(setBedrooms)}
        />
        <NumericInput
          label="Numero de camas"
          value={beds}
          onIncrease={() => handleIncrease(setBeds)}
          onDecrease={() => handleDecrease(setBeds)}
        />
        <NumericInput
          label="Numero de baños"
          value={bathrooms}
          onIncrease={() => handleIncrease(setBathrooms)}
          onDecrease={() => handleDecrease(setBathrooms)}
        />
      </View>
      <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={propertyDescription}
            onChangeText={setPropertyDescription}
            placeholder="Descripción de la propiedad"
            multiline
          />
          <View style={styles.line} />
        </View>

        {/* Botón para agregar imágenes */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddImages}>
          <Icon name="attach" size={30} color="gray" />
          <Text style={styles.addButtonText}>Agregar Imágenes</Text>
        </TouchableOpacity>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    flex: 1,
  },
  textArea: {
    height: 100, // Ajusta la altura para un campo de texto más grande
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 10,
  },
});

export default HostModeScreen;
