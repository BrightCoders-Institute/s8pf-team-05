import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NumericInput from '../../src/components/HostMode/NumericInput';

describe('NumericInput', () => {
  const mockLabel = 'Quantity';
  const mockValue = 5;
  const mockIncrease = jest.fn();
  const mockDecrease = jest.fn();

  it('renders correctly with given props', () => {
    const { getByText, getByDisplayValue } = render(
      <NumericInput label={mockLabel} value={mockValue} onIncrease={mockIncrease} onDecrease={mockDecrease} />
    );

    // Verifica que la etiqueta se muestre correctamente
    expect(getByText(mockLabel)).toBeTruthy();

    // Verifica que el valor se muestre correctamente en el campo de entrada
    expect(getByDisplayValue(mockValue.toString())).toBeTruthy();
  });

  it('calls onIncrease when Increase button is pressed', () => {
    const { getByTestId } = render(
      <NumericInput label={mockLabel} value={mockValue} onIncrease={mockIncrease} onDecrease={mockDecrease} />
    );

    // Simula el clic en el botón de aumento
    fireEvent.press(getByTestId('increase-button'));

    // Verifica que la función onIncrease haya sido llamada
    expect(mockIncrease).toHaveBeenCalled();
  });

  it('calls onDecrease when Decrease button is pressed', () => {
    const { getByTestId } = render(
      <NumericInput label={mockLabel} value={mockValue} onIncrease={mockIncrease} onDecrease={mockDecrease} />
    );

    // Simula el clic en el botón de disminución
    fireEvent.press(getByTestId('decrease-button'));

    // Verifica que la función onDecrease haya sido llamada
    expect(mockDecrease).toHaveBeenCalled();
  });
});
