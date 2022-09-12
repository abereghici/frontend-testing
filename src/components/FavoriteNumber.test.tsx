import {user, render, screen} from '../test';
import {FavoriteNumber} from './FavoriteNumber';

test('renders a number input with a label "Favorite Label"', async () => {
  render(<FavoriteNumber />);

  const input = screen.getByLabelText(/favorite number/i);

  expect(input).toHaveAttribute('type', 'number');
});

test('entering an invalid value shows an error message', async () => {
  const {rerender} = render(<FavoriteNumber />);

  const input = screen.getByLabelText(/favorite number/i);

  await user.type(input, '10');

  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i);

  rerender(<FavoriteNumber max={10} />);

  expect(screen.queryByRole('alert')).toBeNull();
});
