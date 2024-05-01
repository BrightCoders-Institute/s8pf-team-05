import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SaveButton from '../../src/components/Date/SaveButton';

describe('SaveButton component', () => {
  it('renders without crashing', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<SaveButton onPress={onPressMock} disabled={false} />);
    
    // Verificar que el botón está presente
    const saveButton = getByText('Next');
    expect(saveButton).toBeTruthy();

    // Simular clic en el botón
    fireEvent.press(saveButton);

    // Verificar que la función onPress se llamó
    expect(onPressMock).toHaveBeenCalled();
  });

});
