import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatList from '../../src/screens/ChatList';

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: () => ({
    where: () => ({
      onSnapshot: jest.fn(),
    }),
  }),
}));

jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: { uid: 'user-id' },
}));

describe('ChatList Component', () => {
  test('renders loading state', () => {
    const { getByText } = render(<ChatList />);
    expect(getByText('Loading...')).toBeTruthy();
  });

});
