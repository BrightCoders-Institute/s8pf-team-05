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
              <Text style={styles.text_name}>{favorite.propertyName}</Text>
              <Text style={styles.textinf}>{favorite.propertyAdress}</Text>
              <Text style={styles.textinf}>Price: ${favorite.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default CardFavorites

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#444444',
  },
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  containerPrincipal: {
    margin: 20
  },
  img: {
    width: 150,
    height: 150,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  container_description: {
    backgroundColor: '#263238',
    flex: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center'
  },
  description_text: {
    fontSize: 15,
  },
  text_name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  textinf: {
    color: 'white'
  },
  container_btn: {
    position: 'absolute',
  }
})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import CardWish from '../components/whislistComponents/CardWish'

// const Wishlist = () => {
//   return (
//     <View style ={ styles.container}>
//       <Text style={styles.header}>Whislist</Text>
//       <View style ={ styles.containerCards}>
//         <CardWish/>
//         <CardWish/>
//         <CardWish/>
//         <CardWish/>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 30,
//     paddingVertical: 20,
//   },
//     containerCards: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginTop:20
//     },
//     header:{
//         fontSize:40,
//         fontWeight:'bold',
//         color: '#444444',
//     }
// })

// export default Wishlist
