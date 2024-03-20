import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SearchBar from '../components/Explore/SearchBar';
import CategoryButton from '../components/Explore/CategoryButton';
import PropertyCard from '../components/Explore/PropertyCard';


const Explore = ({navigation}: any) => {
  const goToCategory = (category: string) => {
    console.log('go to category: ', category);
    setSelectedCategory(category);
  };

   const categories = [
     { name: 'Departments', icon: 'building', properties: [{ id: 1, name: 'Departamento 1', images: ['https://www.vivepolanco.mx/wp-content/uploads/2020/03/blog-1.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjjvsVW47okDonu6jFJvJwUVLsuW7kfkcfeybdiu4LA&s', 'https://favim.com/pd/1tb/preview/7/781/7811/78111/7811156.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5} ], },
     { name: 'Houses', icon: 'house-chimney', properties: [{ id: 2, name: 'Casa 1', images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUjEpBQBRCCDixuTwwhrfyUrNC-R7NtKsNIALHAsIFA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjjvsVW47okDonu6jFJvJwUVLsuW7kfkcfeybdiu4LA&s', 'https://cdn-5.urmy.net/images/plans/DTE/bulk/4536/CleanShot-2022-01-17-at-16.13.42@2x.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
     { name: 'Pool', icon: 'house-flood-water', properties: [{ id: 3, name: 'Alberca 1', images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHwHlW72vhARkHxLaZCH02MtlxKvF1Jjd3zSAobfmRQ&s', 'https://favim.com/pd/1tb/preview/7/781/7811/78111/7811156.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuKDsOHT93hm-HnwaXhmLgHfHq8XgoajwRK-Ij8BKvBg&s'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
     { name: 'Outside', icon: 'tree', properties: [{ id: 4, name: 'Outside 1', images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD3kMj9atp_RK0sLe6ok9meWwplVMRZt1tvXOZ-FjXDw&s', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
     { name: 'Beach', icon: 'umbrella-beach', properties: [{ id: 5, name: 'Beach 1', images: ['https://decofilia.com/wp-content/uploads/2023/05/como-decorar-casas-de-playa-00.jpg', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
     { name: 'Mountain', icon: 'mountain', properties: [{ id: 6, name: 'Mountain 1', images: ['https://media.istockphoto.com/id/910224886/es/foto/chalet-casas-de-monta%C3%B1a.jpg?s=612x612&w=0&k=20&c=qAUBGIIdHtY4Vj9twHBz2WsC6P3LawGZK_zWqGFmdwc=', 'image2.jpg', 'image3.jpg'], location: 'Ciudad de México', description: 'Acogedor departamento cerca del centro.', dateAvailable: 'Disponible ahora', price: '$100 por noche', rating: 4.5 },] },
   ];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].name,
  );

  const renderProperties = () => {
    if (!selectedCategory) {
      return null;
    }

    const properties =
      categories.find(cat => cat.name === selectedCategory)?.properties || [];

    return properties.map(property => (
      <PropertyCard
        key={property.id}
        property={property}
        onPress={() => {
          navigation.navigate('PropertyDetails', property); //Mandar la información de la Propiedad a la ScreenDetails.
        }}
      />
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar
          onPress={() => {
            navigation.navigate('SelectCity');
          }}
        />
        <View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}>
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
            <View>
              <View style={styles.propertiesContainer}>
                {renderProperties()}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#F3F3F3',
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
    backgroundColor: '#F3F3F3',
  },
});

export default Explore;
