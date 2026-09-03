import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wedding invitation content', () => {
  render(<App />);

  expect(screen.getAllByText(/김동환/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/강지윤/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/December 12, 2025/i)).toBeInTheDocument();
  expect(screen.getAllByText(/the start of our forever/i).length).toBeGreaterThan(0);
});
