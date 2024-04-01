import React, {useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import {firebase} from '@react-native-firebase/auth';

const HostModeUpdateProperties: React.FC = ({route}: any) => {
  const navigation = useNavigation();
  const {property} = route.params;

  const [propertyName1, setPropertyName] = React.useState(property.propertyName);
  const [propertyLocation1, setPropertyLocation] = React.useState(property.location);
  const [guests1, setGuests] = React.useState(property.guests);
  const [bedrooms1, setBedrooms] = React.useState(property.bedrooms);
  const [beds1, setBeds] = React.useState(property.beds);
  const [bathrooms1, setBathrooms] = React.useState(property.bathrooms);
  const [propertyDescription1, setPropertyDescription] = React.useState(property.description);
  const [propertyImages1, setPropertyImages] = React.useState<string[]>(property.images);
  const [price1, setPrice] = React.useState<number | undefined>(property.price);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [propertyType1, setPropertyType] = React.useState<string>(property.propertyType);
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
    const updatedImages = [...propertyImages1];
    updatedImages.splice(index, 1);
    setPropertyImages(updatedImages);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleUpdateProperty = async () => {
    if (
      !propertyName1 ||
      !propertyLocation1 ||
      guests1 <= 0 ||
      bedrooms1 <= 0 ||
      beds1 <= 0 ||
      bathrooms1 <= 0 ||
      !price1 ||
      price1 <= 0 ||
      propertyImages1.length === 0 ||
      !propertyType1
    ) {
      Alert.alert(
        'Please fill in all required fields and ensure numerical values are greater than 0.',
      );
      return;
    }
    try {
      const propertyRef = firestore().collection('properties').doc(property.id);
      await propertyRef.update({
        propertyName: propertyName1,
        location: propertyLocation1,
        guests: guests1,
        bedrooms: bedrooms1,
        beds: beds1,
        bathrooms: bathrooms1,
        description: propertyDescription1,
        avaliabilityDates: selectedDate,
        price: price1,
        propertyType: propertyType1,
      });

      // Upload images to Firebase Cloud Storage
      const imageUploadPromises = propertyImages1.map(async (image, index) => {
        const imageName = `image_${index}`;
        const response = await fetch(image);
        const blob = await response.blob(); // Convertir la imagen a un blob
        const imageRef = storage().ref(`images/${propertyRef.id}/${imageName}`);
        await imageRef.put(blob); // Utilizar put() en lugar de putFile()
        const imageUrl = await imageRef.getDownloadURL();
        return imageUrl;
       });

      setPropertyName('');
      setPropertyLocation('');
      setGuests(0);
      setBedrooms(0);
      setBeds(0);
      setBathrooms(0);
      setPropertyDescription('');
      setSelectedDate(null);
      setPrice(undefined);
      setPropertyImages([]);

      // Mostrar una alerta de éxito al usuario
      Alert.alert('Success', 'Property updated successfully!');
      navigation.replace('HostModePropertiesList');
      //console.log('Property added!');
    } catch (error) {
      console.error('Error adding property: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNavigation whereNav="Profile" />
      <Text style={styles.title}>Edit your property</Text>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={propertyName1}
              onChangeText={setPropertyName}
              placeholder="Property name"
              placeholderTextColor={'#7C7C7C'}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={propertyLocation1}
              onChangeText={setPropertyLocation}
              placeholder="Property location"
              placeholderTextColor={'#7C7C7C'}
            />
          </View>

          <NumericInput
            label="Number of guests"
            value={guests1}
            onIncrease={() => handleIncrease(setGuests)}
            onDecrease={() => handleDecrease(setGuests)}
          />
          <NumericInput
            label="Number of rooms"
            value={bedrooms1}
            onIncrease={() => handleIncrease(setBedrooms)}
            onDecrease={() => handleDecrease(setBedrooms)}
          />
          <NumericInput
            label="Number of beds"
            value={beds1}
            onIncrease={() => handleIncrease(setBeds)}
            onDecrease={() => handleDecrease(setBeds)}
          />
          <NumericInput
            label="Number of bathrooms"
            value={bathrooms1}
            onIncrease={() => handleIncrease(setBathrooms)}
            onDecrease={() => handleDecrease(setBathrooms)}
          />

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={price1 !== undefined ? price1.toString() : ''}
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
              selectedValue={propertyType1}
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
              value={propertyDescription1}
              onChangeText={setPropertyDescription}
              placeholder="Property description"
              placeholderTextColor={'#7C7C7C'}
              multiline
            />
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={showDatePicker}>
            <Text style={styles.addButtonText}>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : 'Select Availability Dates'}
            </Text>
            <Icon name="calendar" size={30} color="gray" />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddImages}>
            <Text style={styles.addButtonText}>Add Images</Text>
            <Icon name="attach" size={30} color="gray" />
          </TouchableOpacity>

          <View style={styles.imagesContainer}>
            {propertyImages1.map((imageUrl, index) => (
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
            onPress={handleUpdateProperty}>
            <Text style={styles.addPropertyButtonText}>Edit Property</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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

export default HostModeUpdateProperties;
