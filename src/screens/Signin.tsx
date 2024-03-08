import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SigninInputs from '../components/SignIn/SigninInputs';
import ContinueButton from '../components/SignIn/ContinueButton';
import CreateAccountButton from '../components/CreateAccount/CreateAccountButton';
import LoginAccounts from '../components/SignIn/LoginAccounts';

const Signin = ({navigation}: any) => {
  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
        <Text style={styles.title}>Welcome to Eirbianbi</Text>
        <Text style={styles.subtitle}>Please Sign in or Create an Account</Text>
        <SigninInputs />
        <ContinueButton
          onPress={() => {
            navigation.replace('Main');
          }}
        />
        <CreateAccountButton
          onPress={() => {
            navigation.replace('CreateAccount');
          }}
        />
        <LoginAccounts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 80,
  },
  second_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  },
});

export default Signin;
