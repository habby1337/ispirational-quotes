import { render, screen } from '@testing-library/react';
import App from './App';


test('renders the app', async () => {
  render(<App />);

  // await screen.findByTestId('container');

  expect(await screen.findByText('Author:')).toBeInTheDocument();

});

