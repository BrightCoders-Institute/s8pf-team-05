import React from 'react';
import { render } from '@testing-library/react-native';
import RatingBox from '../../src/components/PropertyDetails/RatingBox';

describe('RatingBox Component', () => {
  test('renders with averageRating and totalReviews correctly', () => {
    const { getByText } = render(<RatingBox averageRating={4.5} totalReviews={100} />);
    
    expect(getByText('4.5')).toBeTruthy(); // Check if averageRating is rendered
    expect(getByText('100')).toBeTruthy(); // Check if totalReviews is rendered
    expect(getByText('Reviews')).toBeTruthy(); // Check if 'Reviews' text is rendered
  });
});
