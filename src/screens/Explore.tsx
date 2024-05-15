import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import SearchBar from '../components/Explore/SearchBar';
import CategoryButton from '../components/Explore/CategoryButton';
import PropertyCard from '../components/Explore/PropertyCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmptyState from '../components/EmptyState';

const Explore = ({navigation}: any) => {
  const categories = [
    {name: 'Apartments', icon: 'building-wheat', value: 'apartment'},
    {name: 'Houses', icon: 'house-chimney', value: 'house'},
    {name: 'Pool', icon: 'house-flood-water', value: 'pool'},
    {name: 'Countryside', icon: 'tree', value: 'countryside'},
    {name: 'Beach', icon: 'umbrella-beach', value: 'beach'},
    {name: 'Mountain', icon: 'mountain', value: 'mountain'},
    {name: 'Other', icon: 'ellipsis', value: 'other'}, //elipsis, circle-plus, location-dot, grip
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].value,
  );

  const [properties, setProperties] = useState<any[]>([]);
  const [propertiesFound, setPropertiesFound] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          return;
        }

        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        const userData = userDoc.data();
        const defaultCity = userData?.defaultCity;

        if (!defaultCity) {
          return;
        }

        const snapshot = await firestore()
          .collection('properties')
          .where('propertyType', '==', selectedCategory)
          .where('city', '==', defaultCity)
          .get();

        const fetchedProperties = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(fetchedProperties);
        setPropertiesFound(fetchedProperties.length > 0);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          onPress={() => {
            navigation.navigate('SelectCity');
          }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              name={category.name}
              icon={category.icon}
              onPress={() => goToCategory(category.value)}
              isSelected={category.value === selectedCategory}
            />
          ))}
        </ScrollView>
      </View>

      {propertiesFound ? (
        <>
          <ScrollView style={styles.propertiesContainer}>
            {properties.map(property => (
              <PropertyCard
              key={property.id}
              property={property}
              onPress={() => {
                navigation.navigate('PropertyDetails', {property: property});
              }}
              />
            ))}
            <View style={styles.marginContainer}></View>
          </ScrollView>
        </>
      ) : (
        <EmptyState
          imageSource={require('../images/empty-state-explore.png')}
          message="No properties found matching the search criteria."
          style={styles.emptyState}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  marginContainer: {
    height: 20,
  },
  header: {
    elevation: 1.5,
    backgroundColor: 'white',
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  propertiesContainer: {
    flex: 1,
    alignContent: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginTop: '25%',
  },
  emptyState: {
    marginBottom: 120,
  },
});

export default Explore;
