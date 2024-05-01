import React from 'react';
import { render } from '@testing-library/react-native';
import Options from '../../src/components/Date/Options';

describe('Options component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Options />);
    
    // Verificar que las opciones están presentes
    const chooseDatesOption = getByText('Choose dates');
    const flexibleOption = getByText("I'm flexible");
    
    expect(chooseDatesOption).toBeTruthy();
    expect(flexibleOption).toBeTruthy();
  });

});
