import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../__mocks__/store';

test('renders App component correctly', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByTestId('app-container')).toBeTruthy();
});
