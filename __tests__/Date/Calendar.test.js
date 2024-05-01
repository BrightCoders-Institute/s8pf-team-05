import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Calendar from '../../src/components/Date/Calendar'; // Asegúrate de que la ruta sea correcta

describe('Calendar component', () => {
  it('renders without crashing', () => {
    render(<Calendar />);
    // Si no hay errores de renderizado, la prueba pasa automáticamente
  });
});
