import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  imgUser?: string;
  onPress: () => void;
};

const Profilepicture = ({imgUser, onPress}: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.conatiner}>
      {loading && <ActivityIndicator size={70} color={'#47C6E6'} />}
      <Image
        style={styles.img}
        source={
          imgUser === '' || imgUser === undefined
            ? require('../../source/defaultUserImage.jpg')
            : {uri: imgUser}
        }
      />
      <Icon
        style={styles.icon}
        name="pluscircle"
        size={40}
        color={'#B298DC'}
        onPress={onPress}
      />
    </View>
  );
};

export default Profilepicture;

const styles = StyleSheet.create({
  conatiner: {
    width: 150,
    height: 150,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  icon: {
    position: 'absolute',
    top: '67%',
    left: '65%',
  },
});
