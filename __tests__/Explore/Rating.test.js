import React from 'react';
import { render } from '@testing-library/react-native';
import Rating from '../../src/components/Explore/Rating';

describe('Rating component', () => {
  test('renders correctly with average rating', () => {
    const averageRating = 4.5;
    const { getByTestId, getByText } = render(<Rating averageRating={averageRating} />);
    const ratingContainer = getByTestId('average-rating');
    const ratingText = getByText('4.5');

    expect(ratingContainer).toBeTruthy();
    expect(ratingText).toBeTruthy();
  });

  test('displays the correct average rating', () => {
    const averageRating = 3.8;
    const { getByText } = render(<Rating averageRating={averageRating} />);
    const ratingText = getByText('3.8');

    expect(ratingText).toBeTruthy();
  });
});
