import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ClearButton from '../../src/components/Date/ClearButton'; // Asegúrate de que la ruta sea correcta

describe('ClearButton component', () => {
    it('renders without crashing', () => {
      const clearDatesMock = jest.fn();
      const { getByText } = render(<ClearButton clearDates={clearDatesMock} />);
      
      // Verificar que el botón está presente
      const clearButton = getByText('Clear');
      expect(clearButton).toBeTruthy();
  
      // Simular clic en el botón
      fireEvent.press(clearButton);
  
      // Verificar que la función clearDates se llamó
      expect(clearDatesMock).toHaveBeenCalled();
    });
  });