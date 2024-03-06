import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HostModeInactiveScreen: React.FC = () => {
  const handleSendRequest = () => {
    // Lógica para enviar la solicitud
    console.log("Solicitud enviada");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Host Mode Disabled</Text>
      <Text style={styles.subtitle}>Do you want to submit a request to activate host mode for your account?</Text>
      <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
        <Text style={styles.buttonText}>Send request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444444',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7C7C7C',
  },
  button: {
    backgroundColor: '#6F2DBD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HostModeInactiveScreen;
