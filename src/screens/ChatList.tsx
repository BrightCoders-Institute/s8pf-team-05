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
      .collection('chats')
      .where('users', 'array-contains', auth().currentUser.uid)
      .onSnapshot(async snapshot => {
        const chatsData = [];
        for (const doc of snapshot.docs) {
          const chatData = doc.data();
          const otherUserID = chatData.users.find(userID => userID !== auth().currentUser.uid);
          const userDoc = await firestore().collection('users').doc(otherUserID).get();
          const userData = userDoc.data();
          const reservationDetails = chatData.reservationDetails || {};
          const arrivalDate = new Date(reservationDetails.startDate.seconds * 1000);
          const endDate = new Date(reservationDetails.endDate.seconds * 1000);
          const startDateString = arrivalDate.toDateString();
          const endDateString = endDate.toDateString();
          const dateText = startDateString === endDateString ? startDateString : `${startDateString} - ${endDateString}`;
          chatsData.push({
            id: doc.id,
            profileImage: userData?.profileImage || 'https://placeimg.com/140/140/any',
            userName: userData?.name || 'Unknown',
            propertyName: reservationDetails.propertyName || '',
            dateText: dateText || '',
          });
        }
        setChats(chatsData);
        setLoading(false); 
      });
  
    return () => unsubscribe();
  }, []);

  // Componente para mostrar el estado vacío

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
            <TouchableOpacity onPress={() => navigation.navigate('Inbox', { chatId: item.id })}>
              <View style={styles.chatItem}>
                <Avatar
                  rounded
                  source={{
                    uri: item.profileImage ? item.profileImage : 'https://placeimg.com/140/140/any',
                  }}
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
