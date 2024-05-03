import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import PropertyBottomTab from '../../src/components/PropertyDetails/PropertyBottomTab';

describe('PropertyBottomTab', () => {
  const mockPricePerNight = '100';
  const mockOnReservePress = jest.fn();

  it('renders correctly with given props', () => {
    const { getByText } = render(
      <NavigationContainer> 
        <PropertyBottomTab pricePerNight={mockPricePerNight} onReservePress={mockOnReservePress} />
      </NavigationContainer>
    );

    expect(getByText(`${mockPricePerNight} USD`)).toBeTruthy();

    expect(getByText('Reserve')).toBeTruthy();
  });

  it('calls onReservePress when Reserve button is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <PropertyBottomTab pricePerNight={mockPricePerNight} onReservePress={mockOnReservePress} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Reserve'));

    expect(mockOnReservePress).toHaveBeenCalled();
  });
});
