import React, { useState, useEffect } from 'react';
import { Text,View, ScrollView, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../components/Explore/SearchBar';
import CategoryButton from '../components/Explore/CategoryButton';
import PropertyCard from '../components/Explore/PropertyCard';
import firestore from '@react-native-firebase/firestore';

const Explore = ({ navigation }: any) => {
  const categories = [
    { name: 'Apartments', icon: 'building', value: 'apartment' },
    { name: 'Houses', icon: 'house-chimney', value: 'house' },
    { name: 'Pool', icon: 'house-flood-water', value: 'pool' },
    { name: 'Countryside', icon: 'tree', value: 'countryside' },
    { name: 'Beach', icon: 'umbrella-beach', value: 'beach' },
    { name: 'Mountain', icon: 'mountain', value: 'mountain' },
    { name: 'Other', icon: 'home-city', value: 'other' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].value
  );

  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await firestore()
          .collection('properties')
          .where('propertyType', '==', selectedCategory)
          .get();
        
        const fetchedProperties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties: ', error);
      }
    };

    fetchProperties();
  }, [selectedCategory]);

  const goToCategory = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <>
        <View style={{backgroundColor:'red'}}>
            <Text>Likes</Text>  
        </View>
        <View style={styles.container}>
            <View style={styles.propertiesContainer}>
                <FlatList
                    data={properties}
                    renderItem={({item}) => 
                <PropertyCard
                    key={item.id}
                    property={item}
                    onPress={() => {
                    navigation.navigate('PropertyDetails', { property: item });
                    }}/>}
                    keyExtractor={item => item.id}
                />

              </View>
        </View>
    </>
  );
};

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
    backgroundColor: '#F3F3F3',
  },
});

export default Explore;
