import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CardFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) return;

        const userRef = firestore().collection('users').doc(currentUser.uid);
        const likesSnapshot = await userRef.collection('likes').get();
        const likedPropertyIds = likesSnapshot.docs.map(doc => doc.id);
        const favoritesData = [];
        
        for (const propertyId of likedPropertyIds) {
          const propertyRef = firestore().collection('properties').doc(propertyId);
          const propertySnapshot = await propertyRef.get();
          if (propertySnapshot.exists) {
            favoritesData.push({
              id: propertySnapshot.id,
              ...propertySnapshot.data()
            });
          }
        }

        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites: ', error);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <ScrollView>
      <View style={styles.containerPrincipal}>
        <Text style={styles.header}>Wishlist</Text>
        {favorites.map((favorite, index) => (
          <View key={index} style={styles.container}>
            <Image style={styles.img} source={{ uri: favorite.images[0] }} />
            <View style={styles.container_description}>
              <Text style={styles.text_name} numberOfLines={1}>{favorite.propertyName}</Text>
              <Text style={styles.textinf} numberOfLines={1}>Adress: { favorite.propertyAdress}</Text>
              <Text style={styles.textinf} numberOfLines={1}>Price: ${favorite.price}</Text>
              <Text style={{color:"black"}}>Description</Text>
              <Text style={styles.textinf} numberOfLines={2}> {favorite.description}</Text>

            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default CardFavorites

const styles = StyleSheet.create({
    header:{
      fontSize: 35,
      marginBottom: 20
    },
    containerPrincipal:{
      margin:20
    },
    container:{
      flexDirection:'row',
      marginBottom:15,
      
    },
    img:{
      width: 150,
      height:150,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    container_description:{
      flex:1,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
      elevation: 10,
      backgroundColor: 'white'
    },
    description_text:{
      fontSize:15,
  
    },
    text_name:{
      color:'black',
      fontWeight: 'bold',
      fontSize: 20
    },
    textinf:{
      color:'black',
      textAlign:'justify',
      paddingHorizontal:20
    },
    container_btn:{
      position:'absolute',
    }
  })

