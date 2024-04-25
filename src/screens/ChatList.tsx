import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-elements';

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [newChatId, setNewChatId] = useState('');

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
  

  const handleStartChat = async () => {
    try {
      // Verificar si la ID del nuevo chat está vacía
      if (!newChatId.trim()) {
        console.warn('Por favor, introduce la ID del otro usuario.');
        return;
      }
  
      // Obtener la ID del usuario actual
      const currentUserID = auth().currentUser.uid;
  
      // Verificar si el usuario está intentando iniciar un chat consigo mismo
      if (newChatId.trim() === currentUserID) {
        console.warn('No puedes iniciar un chat contigo mismo.');
        return;
      }
  
      // Verificar si ya existe un chat entre los usuarios
      const existingChat = await firestore()
        .collection('chats')
        .where('users', '==', [currentUserID, newChatId.trim()])
        .get();
  
      if (!existingChat.empty) {
        console.warn('Ya tienes un chat con este usuario.');
        return;
      }
  
      // Crear un nuevo chat en Firestore
      const newChatRef = await firestore().collection('chats').add({
        // Aquí puedes definir la estructura del chat según tus requisitos
        users: [currentUserID, newChatId.trim()],
        // Otras propiedades del chat, como mensajes, estado, etc.
      });
  
      // Redireccionar al usuario al chat recién creado
      navigation.navigate('Inbox', { chatId: newChatRef.id });
    } catch (error) {
      console.error('Error starting chat: ', error);
    }
  };
  

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
      <View style={styles.newChatContainer}>
        <TextInput
          style={styles.input}
          placeholder="Introduce la ID del otro usuario"
          value={newChatId}
          onChangeText={text => setNewChatId(text)}
        />
        <Button title="Iniciar Chat" onPress={handleStartChat} />
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: 'purple',
    paddingVertical: 10,
  },
  newChatContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ChatList;
