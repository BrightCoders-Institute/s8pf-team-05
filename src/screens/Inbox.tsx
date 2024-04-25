import React, { useLayoutEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { Composer } from 'react-native-gifted-chat';

const Inbox = ({ route }) => {
  const { chatId } = route.params;
  const currentUser = auth().currentUser;
  const [messages, setMessages] = useState([] as any[]); // Initialize messages state with an empty array

  const [userInfo, setuserInfo] = useState<{
    name: string;
    lastname: string;
    profileImage: string | null;
  }>({
    name: '',
    lastname: '',
    profileImage: null,
  });

  const fetchHostInfo = async () => {
    try {
      const userId = currentUser?.uid;
      
      if (userId) {
        const userDoc = await firestore()
          .collection('users')
          .doc(userId)
          .get();

        const userData = userDoc.data();
        
        if (userData) {
          const {name, lastname, profileImage} = userData;
          setuserInfo({name, lastname, profileImage});
        }
      }
    } catch (error) {
      console.error('Error fetching host info: ', error);
    }
  };
  fetchHostInfo();

  useLayoutEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })));
      });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(async (messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    try {
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({ _id, createdAt, text, user });
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }, [chatId]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: currentUser?.uid ?? '',
        name: userInfo.name,
        avatar: userInfo.profileImage ?? '',
      }}
      renderComposer={(props) => <Composer textInputStyle={{ color: 'black' }} {...props} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Inbox;
