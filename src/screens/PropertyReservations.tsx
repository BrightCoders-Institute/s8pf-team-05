import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import EmptyState from '../components/EmptyState';

const PropertyReservations = ({ route, navigation }: any) => {
    const hostId = auth().currentUser.uid;
    const { propertyId } = route.params;
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [otherUserId, setOtherUserId] = useState('');
    const [loading, setLoading] = useState(true);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleDeleteReservation = (reservationId: string) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this reservation?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => confirmReservationDeletion(reservationId) }
            ]
        );
    };

    const confirmReservationDeletion = (reservationId: string) => {
        // Obtener referencia a la subcolección de chat asociada a la reserva
        const chatCollectionRef = firestore()
            .collection('properties')
            .doc(propertyId)
            .collection('reservations')
            .doc(reservationId)
            .collection('chat');
    
        // Obtener todos los documentos dentro de la subcolección de chat
        chatCollectionRef
            .get()
            .then(querySnapshot => {
                // Eliminar cada documento dentro de la subcolección de chat y sus mensajes asociados
                const deletePromises = [];
                const chatIds = [];
                querySnapshot.forEach(chatDoc => {
                    const chatId = chatDoc.id;
                    chatIds.push(chatId);
                    // Eliminar los documentos de mensajes dentro del chat
                    const messageCollectionRef = chatCollectionRef.doc(chatId).collection('messages');
                    deletePromises.push(
                        messageCollectionRef.get().then(messageQuerySnapshot => {
                            const messageDeletePromises = [];
                            messageQuerySnapshot.forEach(messageDoc => {
                                messageDeletePromises.push(messageDoc.ref.delete());
                            });
                            return Promise.all(messageDeletePromises);
                        })
                    );
                    // Eliminar el documento de chat
                    deletePromises.push(chatDoc.ref.delete());
                });
                // Esperar a que se completen todas las eliminaciones
                return Promise.all(deletePromises).then(() => chatIds);
            })
            .then(chatIds => {
                // Una vez eliminados los documentos de chat, eliminar la reserva
                return firestore()
                    .collection('properties')
                    .doc(propertyId)
                    .collection('reservations')
                    .doc(reservationId)
                    .delete()
                    .then(() => chatIds);
            })
            .then(chatIds => {
                // Eliminar las referencias del chat en las colecciones de chats del host y del usuario
                const deleteChatPromises = chatIds.map(chatId => {
                    // Eliminar la referencia del chat en la colección de chats del host
                    return firestore()
                        .collection('users')
                        .doc(hostId)
                        .collection('chats')
                        .doc(chatId)
                        .delete()
                        .catch(error => {
                            console.log('Error deleting chat reference in host collection:', error);
                        });
                });
                // Obtener el ID del usuario asociado a la reserva
                const userId = selectedReservation.userData.idGuest;
                // Eliminar la referencia del chat en la colección de chats del usuario
                deleteChatPromises.push(
                    firestore()
                        .collection('users')
                        .doc(otherUserId)
                        .collection('chats')
                        .doc(chatIds[0]) // Suponiendo que solo hay un chat asociado a la reserva
                        .delete()
                        .catch(error => {
                            console.log('Error deleting chat reference in user collection:', error);
                        })
                        .then(() => {
                            firestore()
                                .collection('users')
                                .doc(otherUserId)
                                .collection('reservations')
                                .where('reservationId', '==', reservationId) // Buscar por el campo 'reservationId'
                                .get()
                                .then(querySnapshot => {
                                    querySnapshot.forEach(doc => {
                                        // Eliminar el documento de reserva encontrado
                                        doc.ref.delete().then(() => {
                                            console.log('Reservation successfully deleted');
                                        }).catch(error => {
                                            console.error('Error deleting reservation:', error);
                                        });
                                    });
                                })
                                .catch(error => {
                                    console.error('Error searching for reservation:', error);
                                });
                        })
                );
                return Promise.all(deleteChatPromises);
            })
            .then(() => {
                // Cerrar el modal después de eliminar la reserva
                setSelectedReservation(null);
            })
            .catch(error => {
                console.log('Error deleting reservation and chat:', error);
            });
    };
    
    

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('properties')
            .doc(propertyId)
            .collection('reservations')
            .onSnapshot(snapshot => {
                const reservationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReservations(reservationsData);
                setLoading(false);
                
                // Fetch user data for each reservation
                reservationsData.forEach(reservation => {
                    firestore()
                        .collection('users')
                        .doc(reservation.idGuest)
                        .get()
                        .then(userSnapshot => {
                            const userData = userSnapshot.data();
                            // Update reservation data with user info
                            setReservations(prevReservations => {
                                return prevReservations.map(prevReservation => {
                                    if (prevReservation.id === reservation.id) {
                                        return { ...prevReservation, userData };
                                    }
                                    return prevReservation;
                                });
                            });
                        })
                        .catch(error => console.log("Error fetching user data:", error));
                });
            });

        return () => unsubscribe();
    }, [propertyId]);

    const renderReservationItem = ({ item }: any) => {
        const { idGuest, date_of_arrival, departure_date, guestAdults, guestKids, userData } = item;
        const arrivalDate = new Date(date_of_arrival.seconds * 1000);
        const departureDate = new Date(departure_date.seconds * 1000);

        return (
            <TouchableOpacity onPress={() => {setSelectedReservation(item); setOtherUserId(idGuest)}}>
                <View style={styles.reservationItem}>
                    <Avatar
                        rounded
                        source={userData && userData.profileImage ? { uri: userData.profileImage } : require('../source/defaultUserImage.jpg')}
                        size="medium"
                        containerStyle={{ marginRight: 10 }}
                    />
                    <View>
                        <Text>{userData ? `${userData.name} ${userData.lastname}` : 'Unknown User'}</Text>
                        <Text>{`${arrivalDate.toDateString()} ${arrivalDate.toDateString() !== departureDate.toDateString() ? `- ${departureDate.toDateString()}` : ''}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack}>
                <Icon name='arrowleft' size={27} color={'black'} />
            </TouchableOpacity>
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    <Text style={styles.title}>Reservations</Text>
                    {reservations.length === 0 ? (
                        <EmptyState
                            imageSource={require('../images/empty-state-properties-list.png')}
                            message="No reservations yet."
                        />
                    ) : (
                        <FlatList
                            data={reservations}
                            keyExtractor={(item) => item.id}
                            renderItem={renderReservationItem}
                        />
                    )}
                </>
            )}
            <Modal isVisible={selectedReservation !== null} onBackdropPress={() => setSelectedReservation(null)}>
                <View style={styles.modalContainer}>
                    {selectedReservation && selectedReservation.userData && (
                        <>
                            <View style={styles.userInfoContainer}>
                                <Avatar
                                    rounded
                                    source={selectedReservation.userData.profileImage ? { uri: selectedReservation.userData.profileImage } : require('../source/defaultUserImage.jpg')}
                                    size="large"
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.userName}>{`${selectedReservation.userData.name} ${selectedReservation.userData.lastname}`}</Text>
                                </View>
                            </View>
                            <View style={styles.reservationInfo}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Reservation Info</Text>
                                <View>
                                    <Text>{`Arrival Date: ${new Date((selectedReservation as any).date_of_arrival.seconds * 1000).toDateString()}`}</Text>
                                    <Text>{`Departure Date: ${new Date((selectedReservation as any).departure_date.seconds * 1000).toDateString()}`}</Text>
                                    <Text>{`Guests: ${(selectedReservation as any).guestAdults} Adults, ${(selectedReservation as any).guestKids} Kids`}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteReservation(selectedReservation.id)}>
                                    <Text style={styles.deleteButtonText}>Delete Reservation</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        marginTop: 20,
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    reservationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        width: 200,
        alignSelf: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    reservationInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PropertyReservations;
