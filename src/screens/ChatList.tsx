import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-elements';

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);

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
          const propertyDoc = await firestore().collection('properties').doc(chatData.propertyId).get();
          const propertyData = propertyDoc.data();
          const startDate = new Date(chatData.startDate);
          const endDate = new Date(chatData.endDate);
          const stayDate = startDate.toDateString() === endDate.toDateString() ? startDate.toDateString() : `${startDate.toDateString()} - ${endDate.toDateString()}`;
          chatsData.push({
            id: doc.id,
            profileImage: userData?.profileImage || 'https://placeimg.com/140/140/any',
            userName: userData?.name || 'Unknown',
            propertyName: propertyData?.title || 'Unknown Property',
            stayDate: stayDate || 'Unknown Dates',
          });
        }
        setChats(chatsData);
      });
  
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
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
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.stayDate}>{item.stayDate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    borderBottomColor: 'purple',
    paddingVertical: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
  },
  stayDate: {
    fontSize: 14,
    color: '#888',
  },
});

export default ChatList;
