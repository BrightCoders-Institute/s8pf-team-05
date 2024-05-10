import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

const PropertyReservations = ({ route, navigation }: any) => {
    const { propertyId } = route.params;
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleDeleteReservation = (reservationId: string) => {
        // Mostrar un cuadro de diálogo de confirmación antes de eliminar la reserva
        Alert.alert(
            'Delete Reservation',
            'Are you sure you want to delete this reservation?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // Eliminar la reserva
                        firestore()
                            .collection('properties')
                            .doc(propertyId)
                            .collection('reservations')
                            .doc(reservationId)
                            .delete()
                            .then(() => {
                                // Eliminar la subcolección de chat asociada a la reserva
                                firestore()
                                    .collection('properties')
                                    .doc(propertyId)
                                    .collection('reservations')
                                    .doc(reservationId)
                                    .collection('chat')
                                    .get()
                                    .then(querySnapshot => {
                                        querySnapshot.forEach(doc => {
                                            doc.ref.delete();
                                        });
                                    })
                                    .catch(error => {
                                        console.log('Error deleting chat:', error);
                                    });
                            })
                            .catch(error => {
                                console.log('Error deleting reservation:', error);
                            });
                        // Cerrar el modal después de eliminar la reserva
                        setSelectedReservation(null);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('properties')
            .doc(propertyId)
            .collection('reservations')
            .onSnapshot(snapshot => {
                const reservationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReservations(reservationsData);

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
            <TouchableOpacity onPress={() => setSelectedReservation(item)}>
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
            <Text style={styles.title}>Reservations for this property</Text>
            {reservations.length === 0 ? (
                <Text>No reservations found</Text>
            ) : (
                <FlatList
                    data={reservations}
                    keyExtractor={item => item.id}
                    renderItem={renderReservationItem}
                />
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
});

export default PropertyReservations;
