import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PropertyCard from '../../src/components/Explore/PropertyCard';

describe('PropertyCard component', () => {
    test('renders correctly', () => {
      // Render the PropertyCard component
      const { getByText } = render(
        <PropertyCard
          property={{
            images: [],
            city: 'Test City',
            rating: 4.5,
            propertyName: 'Test Property',
            price: '$100',
          }}
          onPress={() => {}}
        />
      );
  
      // Assert that the component renders correctly by checking for a text element
      expect(getByText('Test Property')).toBeTruthy();
      expect(getByText('Test City')).toBeTruthy();
      expect(getByText('$100 night')).toBeTruthy();
    });
  });