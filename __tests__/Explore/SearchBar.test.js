import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../../src/components/Explore/SearchBar';

describe('SearchBar component', () => {
  test('renders correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<SearchBar onPress={onPressMock} />);
    const textElement = getByText('Where you going?');
    expect(textElement).toBeTruthy();
  });

  test('calls onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<SearchBar onPress={onPressMock} />);
    const button = getByText('Where you going?');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
