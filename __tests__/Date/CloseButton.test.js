import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react-native';
import CloseButton from '../../src/components/Date/CloseButton';

describe('CloseButton component', () => {
  it('renders without crashing', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CloseButton onPress={onPressMock} />);
    
    // Buscar el botón de cierre por el texto dentro del icono
    const closeButton = getByText('');

    // Simular clic en el botón
    fireEvent.press(closeButton);

    // Verificar que la función onPress se llamó
    expect(onPressMock).toHaveBeenCalled();
  });
});
