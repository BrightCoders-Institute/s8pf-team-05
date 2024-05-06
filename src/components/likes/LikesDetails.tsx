import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import Icon from 'react-native-vector-icons/AntDesign';

interface LikesDetailsProps {
    idProperty: any
}

const LikesDetails = ({ idProperty }: LikesDetailsProps) => {
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const likeDoc = await firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .collection('likes')
                        .doc(idProperty)
                        .get();

                    if (likeDoc.exists) {
                        setHeart(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching like status: ', error);
            }
        };

        fetchLikeStatus();
    }, []);
    const addLike = async () => {
        try {

            const currentUser = auth().currentUser;
            if (currentUser) {
                await firestore()
                .collection('users')
                .doc(currentUser.uid)
                .collection('likes')
                .doc(idProperty)
                .set({
                    idProperty,
                    liked: true
                });
                console.log('agg')
            } 
            
        } catch (error) {
            console.error('Error adding like to Firestore: ', error);
        }
    }
    
    const deletelike = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                await firestore()
                .collection('users')
                .doc(currentUser.uid)
                .collection('likes')
                .doc(idProperty)
                .delete();
            } 
            console.log('del')
            
        } catch (error) {
            console.error('Error adding like to Firestore: ', error);
        }
    }

    return (
        <TouchableOpacity
            onPress={() => {
                setHeart(prevState => !prevState);
                !heart ? addLike() : deletelike();
            }}
        >
            <Icon name={heart ? 'heart' : 'hearto'} size={25} color={'red'} />
        </TouchableOpacity>
    )
}

export default LikesDetails

const styles = StyleSheet.create({})
