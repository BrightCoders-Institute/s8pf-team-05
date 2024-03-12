import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

const CreateAccountButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.createBtn}>
          <Text style={styles.txt}>Create an Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 30,
    },
    createBtn: {
        alignItems: 'center',
        width: 320,
        height: 45,
        borderWidth: 1,
        borderColor: '#6F2DBD',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    txt: {
        color: '#444444',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default CreateAccountButton;