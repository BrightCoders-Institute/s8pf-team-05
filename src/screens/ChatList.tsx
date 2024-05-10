import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-elements';
import EmptyState from '../components/EmptyState';

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('chats')
      .onSnapshot(async snapshot => {
        const chatsData = [];
        for (const doc of snapshot.docs) {
          const chatData = doc.data();
          const propertyId = chatData.propertyId;
          const reservationId = chatData.reservationId;
          const chatId = chatData.chatId;

          const chatRef = await firestore().collection('properties').doc(propertyId).collection('reservations').doc(reservationId).collection('chat').doc(chatId).get();
          const chat = chatRef.data();

          const otherUserID = chat.users.find(userID => userID !== auth().currentUser.uid);
          const userDoc = await firestore().collection('users').doc(otherUserID).get();
          const userData = userDoc.data();

          const arrivalDate = new Date(chat.reservationDetails.startDate.seconds * 1000);
          const endDate = new Date(chat.reservationDetails.endDate.seconds * 1000);
          const startDateString = arrivalDate.toDateString();
          const endDateString = endDate.toDateString();
          const dateText = startDateString === endDateString ? startDateString : `${startDateString} - ${endDateString}`;

          chatsData.push({
            id: chatId,
            profileImage: userData?.profileImage || '',
            userName: userData?.name || 'Unknown',
            propertyName: chat.reservationDetails.propertyName || '',
            dateText: dateText || '',
            reservationId: reservationId,
            propertyId: propertyId
          });
        }
        setChats(chatsData);
        setLoading(false); 
      });
  
      return () => {
        unsubscribe();
      };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <EmptyState
                  imageSource={require('../images/empty-state-chat-list.png')}
                  message="No messages yet!"
                />
          } // EmptyState component
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Inbox', { chatId: item.id, reservationId: item.reservationId, propertyId: item.propertyId })}>
              <View style={styles.chatItem}>
                <Avatar
                  rounded
                  source={item.profileImage === '' ? require('../source/defaultUserImage.jpg') : {uri: item.profileImage}}
                  size="medium"
                  
                />
                <View style={styles.userInfo}>
                  <Text style={styles.propertyName}>{item.propertyName}</Text>
                  <Text style={styles.userName}>Chat with {item.userName}</Text>
                  <Text style={styles.dates}>{item.dateText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    color: '#444444',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    paddingVertical: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyName: {
    fontSize: 14,
    color: 'gray',
  },
  dates: {
    fontSize: 14,
    color: 'gray',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ChatList;
