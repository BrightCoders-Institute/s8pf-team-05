import { View, TouchableOpacity, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const Explore = () => {
  const goToSelectCity = () => {
    console.log('go to select city');
  };

  const goToCategory = (category) => {
    console.log('go to category: ', category);
    setSelectedCategory(category);
  };

  const categories = [
    { name: 'Departaments', icon: 'home' },
    { name: 'Houses', icon: 'building' },
    { name: 'Pool', icon: 'swimming-pool' },
    { name: 'Outside', icon: 'tree' },
    { name: 'Beach', icon: 'umbrella-beach' },
    { name: 'Mountain', icon: 'mountain' },
  ];


  const [selectedCategory, setSelectedCategory] = useState(null);


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={goToSelectCity} style={styles.searchButton}>
          <Icon name="search" size={20} />
          <Text style={styles.buttonText}>Where you going?</Text>
        </TouchableOpacity>
      </View>
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
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 50,
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
    paddingHorizontal: 20,
    marginRight: 10,
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
});

export default Explore
