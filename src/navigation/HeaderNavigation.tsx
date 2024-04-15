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

    <View style={style}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Icon name="arrowleft" size={27} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderNavigation;

