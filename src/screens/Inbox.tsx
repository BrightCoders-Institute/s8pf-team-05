import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import signOut from '@react-native-firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { Composer } from 'react-native-gifted-chat';

const Inbox = ({ navigation }) => {
  const [messages, setMessages] = useState([] as any[]); // Initialize messages state with an empty array
  const currentUser = auth().currentUser;
  
  
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
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: userInfo.profileImage ?? 'https://placeimg.com/140/140/any',
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Text>Xd</Text>
        </TouchableOpacity>
      ),
    });
  
    const unsubscribe = firestore().collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })));
      });
  
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  
    

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, []);

    const onSend = useCallback(async (messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
      const { _id, createdAt, text, user } = messages[0];
      try {
        await firestore().collection('chats').add({ _id, createdAt, text, user });
      } catch (error) {
        console.error('Error adding message to Firestore: ', error);
      }
    }, []);

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
        renderComposer={(props) => <Composer textInputStyle={{color: 'black'}} {...props} />}
      />
    );
}

export default Inbox;
