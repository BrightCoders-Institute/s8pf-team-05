import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SigninInputs from '../components/SignIn/SigninInputs';
import Button from '../components/SignIn/Button';
import LoginAccounts from '../components/SignIn/LoginAccounts';

const Signin = ({navigation}: any) => {
  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
        <Text style={styles.title}>Welcome to Eirbianbi</Text>
        <Text style={styles.subtitle}>Please Sign in or create an account</Text>
        <SigninInputs />
        <Button
          onPress={() => {
            navigation.replace('Main');
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
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 15,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 19,
    color: '#000000',
    marginHorizontal: 10,
  },
});

export default Signin;
