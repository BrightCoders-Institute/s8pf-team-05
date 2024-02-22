import { View, ScrollView, StyleSheet } from 'react-native';
import React, {useState} from 'react'
import SearchBar from '../components/Explore/SearchBar';
import CategoryButton from '../components/Explore/CategoryButton';
import PropertyCard from '../components/Explore/PropertyCard';

const Explore = () => {

  const goToCategory = (category: string) => {
    console.log('go to category: ', category);
    setSelectedCategory(category);
  };

  const categories = [
    { name: 'Departaments', icon: 'building', properties: [{ id: 1, name: 'Departamento 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },
      { id: 2, name: 'Departamento 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Houses', icon: 'house-chimney', properties: [{ id: 2, name: 'Casa 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Pool', icon: 'house-flood-water', properties: [{ id: 3, name: 'Alberca 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Outside', icon: 'tree', properties: [{ id: 4, name: 'Outside 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Beach', icon: 'umbrella-beach', properties: [{ id: 5, name: 'Beach 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
    { name: 'Mountain', icon: 'mountain', properties: [{ id: 6, name: 'Mountain 1', images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
  ];


  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].name);

  const renderProperties = () => {
    if (!selectedCategory) return null;
    
    const properties = categories.find(cat => cat.name === selectedCategory)?.properties || [];

    return properties.map(property => (
      <PropertyCard key={property.id} property={property} />
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
              <CategoryButton
                key={index}
                name={category.name}
                icon={category.icon}
                onPress={() => goToCategory(category.name)}
                isSelected={category.name === selectedCategory}
              />
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
    paddingBottom: 30,
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  propertiesContainer: {
    flex: 1,
    alignContent: 'center',
    marginTop: 20,
    marginHorizontal: 35,
  },
});

export default Explore
