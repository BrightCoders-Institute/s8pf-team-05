import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryButton from '../../src/components/Explore/CategoryButton';

describe('CategoryButton component', () => {
  const onPressMock = jest.fn();
  const name = 'Test Category';
  const icon = 'building';

  test('renders correctly', () => {
    const { getByText } = render(
      <CategoryButton name={name} icon={icon} onPress={onPressMock} isSelected={false} />
    );
    const categoryText = getByText(name);
    expect(categoryText).toBeTruthy();
  });

  test('calls onPress handler with correct category name when pressed', () => {
    const { getByText } = render(
      <CategoryButton name={name} icon={icon} onPress={onPressMock} isSelected={false} />
    );
    const categoryButton = getByText(name);
    fireEvent.press(categoryButton);
    expect(onPressMock).toHaveBeenCalledWith(name);
  });
});
