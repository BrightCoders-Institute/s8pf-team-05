import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import SearchBar from '../components/Explore/SearchBar';

const Explore = () => {
  const goToSelectCity = () => {
    console.log('go to select city');
  };

  const goToCategory = (category: string) => {
    console.log('go to category: ', category);
    setSelectedCategory(category);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image style={styles.image} source={{ uri: item }} />
    </View>
  );

  const categories = [
    { name: 'Departaments', icon: 'home', properties: [{ id: 1, name: 'Departamento 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },
      { id: 2, name: 'Departamento 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Houses', icon: 'building', properties: [{ id: 2, name: 'Casa 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Pool', icon: 'building', properties: [{ id: 3, name: 'Alberca 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Outside', icon: 'building', properties: [{ id: 4, name: 'Outside 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Beach', icon: 'building', properties: [{ id: 5, name: 'Beach 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Mountain', icon: 'building', properties: [{ id: 6, name: 'Mountain 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
  ];


  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderProperties = () => {
    if (!selectedCategory) return null;
    
    const properties = categories.find(cat => cat.name === selectedCategory)?.properties || [];

    return properties.map(property => (
      <View key={property.id} style={styles.propertyContainer}>
        <View style={styles.carouselCont}>

          <Carousel
            data={property.images}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
            
          />
        </View>
        <View style={styles.favoriteButtonContainer}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="heart" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.propertyInfo}>
          <View style={styles.propertyHeader}>
            <Text style={styles.propertyLocation}>{property.location}</Text>
            <Text style={styles.propertyRating}>Rating: {property.rating}</Text>
          </View>
          <Text style={styles.propertyDescription}>{property.description}</Text>
          <Text style={styles.propertyDateAvailable}>{property.dateAvailable}</Text>
          <Text style={styles.propertyPrice}>{property.price}</Text>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView >
    <View style={styles.container}>
      <SearchBar />
      <View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToCategory(category.name)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name && styles.selectedCategoryButton,
                ]}
              >
                <View style={styles.categoryContent}>
                  <Icon name={category.icon} size={24} color="black" style={styles.categoryIcon} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View >
            <View style={styles.propertiesContainer}>
              {renderProperties()}
            </View>
          </View>
          
        </View>
      </View>

    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
  },
  searchContainer: {
    marginHorizontal: 35,
    marginTop: 20,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', 
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey', 
    shadowColor: 'black', 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, 
  },
  carouselCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 35,
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  categoryText: {
    fontSize: 16,
  },
  categoryIcon: {
    marginRight: 5,
  },
  selectedCategoryButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    
  },
  propertiesContainer: {
    flex: 1,
    alignContent: 'center',
    marginTop: 20,
    marginHorizontal: 35,
  },
  propertyContainer: {
    marginBottom: 20,
  },
  propertyInfo: {
    marginTop: 10,
    width: 290,
    alignSelf: 'center',
  },
  propertyLocation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  propertyDateAvailable: {
    fontSize: 14,
    marginTop: 5,
  },
  propertyPrice: {
    fontSize: 14,
    marginTop: 5,
  },
  propertyRating: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  slide: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButtonContainer: {
    position: 'absolute',
    top: 10, 
    right: 30, 
  },
  favoriteButton: {
    padding: 5,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Explore
