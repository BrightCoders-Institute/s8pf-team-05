import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import SearchBar from '../components/Explore/SearchBar';
import CategoryButton from '../components/Explore/CategoryButton';
import PropertyCard from '../components/Explore/PropertyCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

        const fetchedProperties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
                  onPress={() => goToCategory(category.value)}
                  isSelected={category.value === selectedCategory}
                />
              ))}
            </ScrollView>
            
            <View>
              {propertiesFound ? (
                <View style={styles.propertiesContainer}>
                  {properties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onPress={() => {
                        navigation.navigate('PropertyDetails', { property: property });
                      }}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Image source={require('../images/no-properties-found.png')} style={styles.emptyStateImage} />
                  <Text style={styles.emptyStateText}>
                    No properties found matching the search criteria.
                  </Text>
                </View>
              )}
              <View style={styles.propertiesContainer}>
                
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
  emptyStateText: {
    marginTop: 10,
    paddingHorizontal: 60,
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
});

export default Explore;
