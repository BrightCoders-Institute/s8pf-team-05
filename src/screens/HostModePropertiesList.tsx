import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import IconDots from 'react-native-vector-icons/Entypo';
import EmptyState from '../components/EmptyState';
import HeaderNavigation from '../navigation/HeaderNavigation';
import firebase from '@react-native-firebase/firestore';

const HostModePropertiesList = ({ navigation }: any) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [activeOptions, setActiveOptions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    async function getDataUser() {
      const propertiesList = await firestore()
        .collection('properties')
        .where('hostId', '==', auth().currentUser?.uid)
        .get();
      const fetchedProperties = propertiesList.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(fetchedProperties);
      setLoading(false); // Finaliza la carga cuando los datos están disponibles
    }
    getDataUser()
  }, []);

  const navigateToPropertyReservations = (propertyId: string, propertyPrice: number) => {
    navigation.navigate('PropertyReservations', { propertyId, propertyPrice });
  };

  const deleteProperty = async (index: number) => {
    Alert.alert(
      `Delete ${properties[index].propertyName}`,
      'Are you sure?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              //Eliminar las reservaciones del usuario a esa propiedad
              const reservationsQuery = await firestore().collection('properties').doc(properties[index].id).collection('reservations').get();
              const reservationDocs = reservationsQuery.docs;
              reservationDocs.map(async doc => {
                const reservationUserReference = doc.data().userReservationReference;
                await reservationUserReference.delete();
              })

              //Eliminar la propiedad
              await firestore().collection('properties').doc(properties[index].id).delete();

              //Eliminar las imágenes de la propiedad
              const imagesRef = storage().ref().child(`images/${properties[index].id}`);
              const imageNames = await imagesRef.listAll();
              const deleteImagePromises = imageNames.items.map(async (imageRef) => {
                await imageRef.delete();
              });

              await Promise.all(deleteImagePromises);

              Alert.alert('Property Deleted!');
              setActiveOptions(null);
            } catch (err) {
              console.log(err);
            }
          }
        }
      ]
    );
  };

  return (
    <>
      <HeaderNavigation />
      <View style={styles.container}>
        <Text style={styles.title}>My Properties</Text>
        {loading ? ( 
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
            <ScrollView>
              {properties.length === 0 ? (
                <EmptyState
                  imageSource={require('../images/empty-state-properties-list.png')}
                  message="You haven't added any properties yet."
                />
              ) : (
                  properties.map((property, index) => {
                    const details = `Guest: ${property.guests} · Bedrooms: ${property.bedrooms} · Beds: ${property.beds} · Bathrooms: ${property.bathrooms}`;
                    const showOptions = (index: number) => { setActiveOptions(activeOptions === index ? null : index) };
                    const editProperty = () => { navigation.navigate('HostModeUpdateProperties', { property: property }); };
                    return (
                      <View style={styles.containerItem} key={index}>
                        <Image
                          style={styles.img}
                          source={{
                            uri: property.images && property.images.length > 0 ? property.images[0] : 'fallback_image_url',
                          }}
                        />
                        <View style={styles.propertyContainer}>
                          <Text style={styles.name}>{property.propertyName}</Text>
                          <Text style={styles.location}>{property.propertyAdress}, {property.city}</Text>
                          <Text numberOfLines={1} style={styles.details}>{details}</Text>
                        </View>
                        <View>
                          <TouchableOpacity onPress={() => showOptions(index)}>
                            <IconDots name="dots-three-vertical" size={27} color="#444444" style={styles.icon} />
                          </TouchableOpacity>
                        </View>
                        {activeOptions === index && (
                          <View style={styles.optionsContainer}>
                            <TouchableOpacity style={styles.optionEdit} onPress={editProperty}>
                              <Text style={styles.optionsTitle}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionDelete} onPress={() => deleteProperty(index)}>
                              <Text style={styles.optionsTitle}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionReservations} onPress={() => navigateToPropertyReservations(property.id, property.price)}>
                              <Text style={styles.optionsTitle}>Reservations</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    );
                  })
                )}
            </ScrollView>
          )}
      </View>
    </>
  )
}

export default HostModePropertiesList



const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#5f6cf0',
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'center',
    right: 15,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
    container: {
      flex: 1,
      paddingHorizontal: 20
    },
    title: {
      color: '#444444',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 30,
    },
    containerItem: {
      flexDirection: 'row',
      marginVertical: 7,
      paddingBottom: 8,
      borderBottomWidth: 1.5,
      borderColor: '#DBDADA',
    },
    propertyContainer: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },
    name: {
      color: '#444444',
      fontSize: 15,
      fontWeight: 'bold',
    },
    location: {
      fontSize: 12,
      color: '#7C7C7C',
    },
    details: {
      fontSize: 11,
      color: '#7C7C7C',
    },
    img: {
      width: 80,
      height: 80,
      borderRadius: 15,
    },
    icon: {
      marginTop: 20,
    },
    optionsContainer: {
      position: 'absolute',
      justifyContent: 'space-between',
      width: 110,
      height: 80,
      marginLeft: 225,
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderColor: '#A4A4A4',
      elevation: 2,
    },
    optionEdit: {
      borderBottomWidth: 1,
      borderColor: '#A4A4A4',
      paddingLeft: 5,
      paddingTop: 2,
      paddingBottom: 2,
      textAlign: 'center',
      //borderWidth: 1,
    },
    optionDelete: {
      paddingLeft: 5,
      paddingBottom: 2,
      //borderWidth: 1,
    },
    optionReservations: {
      borderTopWidth: 1,
      borderColor: '#A4A4A4',
      paddingLeft: 5,
      paddingTop: 2,
      paddingBottom: 2,
      //borderWidth: 1,
    },
    optionsTitle: {
      fontSize: 16,
      color: '#444444',
      alignItems: 'center',
      // borderWidth: 1,
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyStateImage: {
      width: 200,
      height: 200,
      marginBottom: 20,
      marginTop: '25%',
    },
    emptyStateText: {
      fontSize: 18,
      color: '#888',
      paddingHorizontal: 60,
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
})
