import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NumericInput from '../components/HostMode/NumericInput';
import HeaderNavigation from '../navigation/HeaderNavigation';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import {firebase} from '@react-native-firebase/auth';
import SelectLocation from '../components/SelectCity/SelectLocation';

const HostModeScreen: React.FC = ({navigation}: any) => {
  const [guests, setGuests] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState(0);
  const [beds, setBeds] = React.useState(0);
  const [bathrooms, setBathrooms] = React.useState(0);
  const [propertyName, setPropertyName] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [propertyAdress, setPropertyAdress] = React.useState('');
  const [propertyDescription, setPropertyDescription] = React.useState('');
  const [propertyImages, setPropertyImages] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<number | undefined>();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [propertyType, setPropertyType] = React.useState<string>('');
  const userId = firebase.auth().currentUser?.uid || '';

  const handlePropertyTypeSelection = (type: string) => {
    setPropertyType(type);
  };

  const handleIncrease = (
    setState: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setState(prevValue => prevValue + 1);
  };

  const handleDecrease = (
    setState: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setState(prevValue => Math.max(0, prevValue - 1));
  };

  const handleAddImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });
      if (!result.didCancel) {
        const {assets} = result;
        const newImageUrls = assets.map(asset => asset.uri);
        // Concatenate the new images with the existing ones
        setPropertyImages(prevImages => [...prevImages, ...newImageUrls]);
      }
    } catch (error) {
      console.error('Error selecting images: ', error);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...propertyImages];
    updatedImages.splice(index, 1);
    setPropertyImages(updatedImages);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleAddProperty = async () => {
    if (
      !propertyName ||
      !propertyAdress ||
      !selectedCity ||
      guests <= 0 ||
      bedrooms <= 0 ||
      beds <= 0 ||
      bathrooms <= 0 ||
      !price ||
      price <= 0 ||
      propertyImages.length === 0 ||
      !propertyType
    ) {
      Alert.alert(
        'Please fill in all required fields and ensure numerical values are greater than 0.',
      );
      return;
    }
    try {
      const propertyRef = await firestore().collection('properties').add({
        propertyName: propertyName,
        propertyAdress: propertyAdress,
        city: selectedCity,
        guests: guests,
        bedrooms: bedrooms,
        beds: beds,
        bathrooms: bathrooms,
        description: propertyDescription,
        price: price,
        propertyType: propertyType,
        hostId: userId,
      });

      // Upload images to Firebase Cloud Storage
      const imageUploadPromises = propertyImages.map(async (image, index) => {
        const imageName = `image_${index}`;
        const imageRef = storage().ref(`images/${propertyRef.id}/${imageName}`);
        await imageRef.putFile(image);
        const imageUrl = await imageRef.getDownloadURL();
        return imageUrl;
      });

      // Wait for all images to upload and update the property document with image URLs
      const imageUrls = await Promise.all(imageUploadPromises);
      await propertyRef.update({images: imageUrls});

      setPropertyName('');
      setPropertyAdress('');
      setSelectedCity('');
      setGuests(0);
      setBedrooms(0);
      setBeds(0);
      setBathrooms(0);
      setPropertyDescription('');
      setPrice(undefined);
      setPropertyImages([]);

      // Mostrar una alerta de éxito al usuario
      Alert.alert('Success', 'Property added successfully!');
      navigation.replace('HostModePropertiesList');
      console.log('Property added!');
    } catch (error) {
      console.error('Error adding property: ', error);
    }
  };

  return (
    <>
      <HeaderNavigation />
      <View style={styles.container}>
        
        <Text style={styles.title}>Add a new property</Text>
        <ScrollView>
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
                value={propertyAdress}
                onChangeText={setPropertyAdress}
                placeholder="Property Adress"
                placeholderTextColor={'#7C7C7C'}
              />
            </View>

            <View style={styles.inputWrapper}>
              <SelectLocation
                title="Select the property city"
                selectedCity={val => {
                  setSelectedCity(val);
                }}
              />
            </View>

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
                style={styles.input}
                value={price !== undefined ? price.toString() : ''}
                onChangeText={text =>
                  setPrice(text ? parseFloat(text) : undefined)
                }
                placeholder="Price per night"
                placeholderTextColor={'#7C7C7C'}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputWrapper}>
              <SelectPicker
                selectedValue={propertyType}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  handlePropertyTypeSelection(itemValue)
                }>
                <SelectPicker.Item label="Select property type" value="" />
                <SelectPicker.Item label="Apartment" value="apartment" />
                <SelectPicker.Item label="House" value="house" />
                <SelectPicker.Item label="Pool House" value="pool" />
                <SelectPicker.Item
                  label="House in the countryside"
                  value="countryside"
                />
                <SelectPicker.Item label="Beach house" value="beach" />
                <SelectPicker.Item
                  label="House in the mountain"
                  value="mountain"
                />
                <SelectPicker.Item label="Other" value="other" />
              </SelectPicker>
            </View>

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

            <TouchableOpacity style={styles.addButton} onPress={handleAddImages}>
              <Text style={styles.addButtonText}>Add Images</Text>
              <Icon name="attach" size={30} color="gray" />
            </TouchableOpacity>

            <View style={styles.imagesContainer}>
              {propertyImages.map((imageUrl, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDeleteImage(index)}>
                  <Image source={{uri: imageUrl}} style={styles.image} />
                  <Icon
                    name="close-circle"
                    size={24}
                    color="red"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.addPropertyButton}
              onPress={handleAddProperty}>
              <Text style={styles.addPropertyButtonText}>Add property</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    color: '#444444',
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 7,
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
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  picker: {
    marginTop: 20,
    height: 40,
    color: '#000000',
    borderColor: '#DBDADA',
    borderBottomWidth: 1.5,
    paddingHorizontal: 5,
    flex: 1,
  },
});

export default HostModeScreen;
