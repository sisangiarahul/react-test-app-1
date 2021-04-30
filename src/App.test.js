import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Coronavirus (Covid-19) Dashboard for Ireland ', () => {
  render(<App />);
  const linkElement = screen.getByText(/Coronavirus \(Covid-19\) Dashboard for Ireland/i);
  expect(linkElement).toBeInTheDocument();
});
