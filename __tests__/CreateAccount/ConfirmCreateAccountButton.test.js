import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfirmCreateAccountButton from '../../src/components/CreateAccount/ConfirmCreateAccountButton'; // Asegúrate de que la ruta sea correcta

describe("<ConfirmCreateAccountButton />", () => {
    test("renders ConfirmCreateAccountButton component correctly", () => {
      const { getByText } = render(<ConfirmCreateAccountButton />);
      expect(getByText("Create Account")).toBeTruthy(); 
    });

    test("ConfirmCreateAccountButton onPress", () => {
      const mockOnPress = jest.fn();
      const { getByText } = render(<ConfirmCreateAccountButton onPress={mockOnPress} />);
      fireEvent.press(getByText("Create Account"));
      expect(mockOnPress).toHaveBeenCalled();
    });
  }
);
