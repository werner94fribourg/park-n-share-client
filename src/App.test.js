import App from './App';
import { render, screen } from '@testing-library/react';

test('renders base app paragraph', () => {
  render(<App />);
  const linkElement = screen.getByText(/Base App/i);
  expect(linkElement).toBeInTheDocument();
});
