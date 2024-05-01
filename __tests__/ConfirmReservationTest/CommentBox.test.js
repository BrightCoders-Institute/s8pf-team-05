import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CommentBox from '../../src/components/ConfirmReservation/CommentBox'; // Asegúrate de que la ruta sea correcta

describe('CommentBox component', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(<CommentBox placeholder="Placeholder" />);
    expect(getByPlaceholderText('Placeholder')).toBeDefined();
  });

  test('calls onChangeText function when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CommentBox placeholder="Placeholder" onChangeText={onChangeTextMock} />
    );
    fireEvent.changeText(getByPlaceholderText('Placeholder'), 'Test');
    expect(onChangeTextMock).toHaveBeenCalled();
  });
});
