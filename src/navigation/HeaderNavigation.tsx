import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
interface headerProps {
  style?: {};
}
const HeaderNavigation = ({style}: headerProps) => {
  const navigate = useNavigation();
  return (

    <View style={style ? style : styles.button}>
      <TouchableOpacity onPress={() => navigate.navigate('Signin')}>
        <Icon name="arrowleft" size={27} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20, 
  },
});

export default HeaderNavigation;

