/* eslint-disable */
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmptyState from '../components/EmptyState';

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
        {favorites.length === 0 ? (
          <EmptyState
            imageSource={require('../images/empty-state-properties-list.png')}
            message="You haven't liked any property yet."
          />
        ) : (
          favorites.map((favorite, index) => (
          <View key={index} style={styles.container}>
            <Image style={styles.img} source={{ uri: favorite.images[0] }} />
            <View style={styles.container_description}>
              <Text style={styles.textName} numberOfLines={1}>{favorite.propertyName}</Text>
              <Text style={styles.textLocation} numberOfLines={1}>{ favorite.propertyAdress || favorite.location}</Text>
              <Text style={styles.textPrice} numberOfLines={1}>$ {favorite.price}.00 night</Text>
              <Text style={styles.textDescription} numberOfLines={1}> {favorite.description}</Text>
            </View>
          </View>
        ))
      )
    }
      </View>
    </ScrollView>
  )
}

export default CardFavorites

const styles = StyleSheet.create({
    header:{
      color: '#444444',
      fontSize: 32,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
    },
    containerPrincipal:{
      margin:20
    },
    container:{
      flexDirection:'row',
      marginBottom:15,
      
    },
    img:{
      width: 100,
      height:100,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    container_description:{
      flex:1,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'flex-start',
      elevation: 10,
      backgroundColor: 'white'
    },
    description_text:{
      fontSize:12,
    },
    textName:{
      color:'#444444',
      fontWeight: '500',
      fontSize: 16,
      paddingLeft: 10,
      marginTop: 10,
    },
    textLocation:{
      fontSize: 12,
      color: '#7C7C7C',
      textAlign:'justify',
      paddingLeft:10,
    },
    textPrice: {
      color: '#575757',
      fontWeight: '500',
      textAlign:'justify',
      paddingLeft:10,
    },
    textDescription:{
      fontSize: 11,
      color: '#7C7C7C',
      textAlign:'justify',
      paddingLeft:10,
    },
    container_btn:{
      position:'absolute',
    }
  })

