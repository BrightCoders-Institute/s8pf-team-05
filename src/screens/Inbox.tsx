import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { Composer } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/AntDesign';

const Inbox = ({ route, navigation }) => {
  const { chatId } = route.params;
  const { reservationId, propertyId } = route.params;
  const currentUser = auth().currentUser;
  const [messages, setMessages] = useState([] as any[]);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    profileImage: string | null;
  }>({
    name: '',
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatInfo = async () => {
      try {
        
        const chatDoc = await firestore()
        .collection('properties')
        .doc(propertyId)
        .collection('reservations')
        .doc(reservationId)
        .collection('chat')
        .doc(chatId)
        .get();
        const chatData = chatDoc.data();
        const { reservationDetails: chatReservationDetails, users } = chatData || {};
        if (chatReservationDetails) {
          const { propertyName, startDate, endDate } = chatReservationDetails;
          setReservationDetails({ propertyName, startDate: startDate.toDate(), endDate: endDate.toDate() });

          const otherUserId = users.find((userId: string) => userId !== currentUser?.uid);
          if (otherUserId) {
            const otherUserDoc = await firestore().collection('users').doc(otherUserId).get();
            const otherUserData = otherUserDoc.data();
            if (otherUserData) {
              const { name } = otherUserData;
              setUserInfo(prevState => ({ ...prevState, name }));
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat info: ', error);
      }
    };

    fetchChatInfo();
  }, [chatId, currentUser]);

  useLayoutEffect(() => {
    const unsubscribe = firestore()
      .collection('properties')
      .doc(propertyId)
      .collection('reservations')
      .doc(reservationId)
      .collection('chat')
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
        .collection('properties')
        .doc(propertyId)
        .collection('reservations')
        .doc(reservationId)
        .collection('chat')
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        renderAvatar={null}
        renderUsernameOnMessage = {true}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser?.uid ?? '',
          name: userInfo.name,
          avatar: userInfo.profileImage ? { uri: userInfo.profileImage } : require('../source/defaultUserImage.jpg'),
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Inbox;
