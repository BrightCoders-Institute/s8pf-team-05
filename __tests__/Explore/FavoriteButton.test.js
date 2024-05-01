import React from 'react';
import { render } from '@testing-library/react-native';
import FavoriteButton from '../../src/components/Explore/FavoriteButton';

describe("<FavoriteButton />", () => {
    test("renders FavoriteButton component correctly", () => {
      const { getByText } = render(<FavoriteButton />);
      expect(getByText("")).toBeTruthy(); // Adjust this line based on the content of your button
    });
  });