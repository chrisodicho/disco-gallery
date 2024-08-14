import React from 'react';
import { render, screen } from '../../test-utils';
import { Root } from '../root';

test('renders initial loading state', () => {
  render(<Root />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
