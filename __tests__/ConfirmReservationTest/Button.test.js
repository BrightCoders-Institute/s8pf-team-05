import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/components/ConfirmReservation/Button'; // Asegúrate de que la ruta sea correcta

describe('Button component', () => {
  test('renders text correctly', () => {
    const { getByText } = render(<Button text="Press Me" onPress={() => {}} />);
    expect(getByText('Press Me')).toBeDefined();
  });

  test('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button text="Press Me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
