import React from 'react';
import { render } from '@testing-library/react-native';
import HostInfo from '../../src/components/PropertyDetails/HostInfo';

describe('HostInfo component', () => {
  const hostName = 'John Doe';
  const hostImage = 'https://example.com/profile.jpg';

  test('renders correctly', () => {
    const { getByText, getByTestId } = render(<HostInfo hostName={hostName} hostImage={hostImage} />);
    const hostTitle = getByText('Host:');
    const hostNameText = getByText(hostName);
    const hostImageElement = getByTestId('host-image');

    expect(hostTitle).toBeTruthy();
    expect(hostNameText).toBeTruthy();
    expect(hostImageElement).toBeTruthy();
  });

  test('displays correct host name', () => {
    const { getByText } = render(<HostInfo hostName={hostName} hostImage={hostImage} />);
    const hostNameText = getByText(hostName);
    expect(hostNameText).toBeTruthy();
  });

  test('displays host image', () => {
    const { getByTestId } = render(<HostInfo hostName={hostName} hostImage={hostImage} />);
    const hostImageElement = getByTestId('host-image');
    expect(hostImageElement.props.source).toEqual({ uri: hostImage });
  });
});
