/* eslint-disable */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import CreateAccountInputs from '../components/CreateAccount/CreateAccountInputs';
import ContinueButton from '../components/SignIn/ContinueButton';
import Icon from 'react-native-vector-icons/Ionicons';


const CreateAccount = ({navigation}: any) => {
    const [isFormValid, setIsFormValid] = useState(false)

  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
      <Icon onPress={() => {
            navigation.replace('Signin');
          }}
          name="arrow-back" size={27} color="#444444" style={styles.icon}/>
        <Text style={styles.title}>Welcome to Eirbianbi</Text>
        <Text style={styles.subtitle}>Please complete all fields</Text>
        <ScrollView style={styles.scrollContainer}>
            <CreateAccountInputs onValidationChange={(isValid) => setIsFormValid(isValid)}/>
            <ContinueButton
                onPress={() => {
                  if(isFormValid) {
                    navigation.replace('Signin');
                    //console.log('registrado')
                  }else{
                    console.log('error en el formulario')
                  }
                }}
            />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  second_container: {
    flex:1,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginBottom: 5,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#444444',
    marginTop: 15,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#444444',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1, 
  }
});

export default CreateAccount;
