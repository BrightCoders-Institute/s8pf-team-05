import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HostModeInactiveScreen: React.FC = () => {
  const handleSendRequest = () => {
    // Lógica para enviar la solicitud
    console.log("Solicitud enviada");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo Host Desactivado</Text>
      <Text style={styles.subtitle}>¿Deseas enviar una solicitud para activar el modo host en tu cuenta?</Text>
      <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
        <Text style={styles.buttonText}>Enviar solicitud</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6F2DBD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HostModeInactiveScreen;
