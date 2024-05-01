import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateAccountButton from '../../src/components/CreateAccount/CreateAccountButton'; // Asegúrate de que la ruta sea correcta

describe('CreateAccountButton component', () => {
  test('renders correctly and calls onPress function when pressed', () => {
    // Definir una función mock para la prop onPress
    const onPressMock = jest.fn();

    // Renderizar el componente con la función mock como prop
    const { getByText } = render(
      <CreateAccountButton onPress={onPressMock} />
    );

    // Verificar que el texto del botón se renderice correctamente
    expect(getByText('Create an Account')).toBeDefined();

    // Simular clic en el botón y verificar que la función onPress se haya llamado
    fireEvent.press(getByText('Create an Account'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
