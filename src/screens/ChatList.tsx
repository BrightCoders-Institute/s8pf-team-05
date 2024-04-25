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
          chatsData.push({
            id: doc.id,
            profileImage: userData?.profileImage || 'https://placeimg.com/140/140/any',
            userName: userData?.name || 'Unknown',
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
              <Text style={styles.userName}>{item.userName}</Text>
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
  userName: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ChatList;
