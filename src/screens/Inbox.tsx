import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { Composer } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/AntDesign';

const Inbox = ({ route, navigation }) => {
  const { chatId } = route.params;
  const currentUser = auth().currentUser;
  const [messages, setMessages] = useState([] as any[]); // Initialize messages state with an empty array

  const [userInfo, setUserInfo] = useState<{
    name: string;
    lastname: string;
    profileImage: string | null;
  }>({
    name: '',
    lastname: '',
    profileImage: null,
  });

  const [reservationDetails, setReservationDetails] = useState<{
    propertyName: string;
    startDate: Date;
    endDate: Date;
  }>({
    propertyName: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    const fetchChatInfo = async () => {
      try {
        // Fetching user information
        const userId = currentUser?.uid;
        if (userId) {
          const userDoc = await firestore()
            .collection('users')
            .doc(userId)
            .get();

          const userData = userDoc.data();
          if (userData) {
            const { name, lastname, profileImage } = userData;
            setUserInfo({ name, lastname, profileImage });
          }
        }

        // Fetching reservation details
        const chatDoc = await firestore()
          .collection('chats')
          .doc(chatId)
          .get();
        
        const chatData = chatDoc.data();
        const { reservationDetails: chatReservationDetails } = chatData || {};
        if (chatReservationDetails) {
          const { propertyName, startDate, endDate } = chatReservationDetails;
          setReservationDetails({ propertyName, startDate: startDate.toDate(), endDate: endDate.toDate() });
        }
      } catch (error) {
        console.error('Error fetching chat info: ', error);
      }
    };

    fetchChatInfo();
  }, [chatId, currentUser]);

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

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name='arrowleft' size={27} color={'black'} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Chat with {userInfo.name}</Text>
          <Text style={styles.headerSubTitle}>{reservationDetails.propertyName}</Text>
          <Text style={styles.headerSubTitle}>{reservationDetails.startDate.toDateString()} - {reservationDetails.endDate.toDateString()}</Text>
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  headerText: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubTitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Inbox;
