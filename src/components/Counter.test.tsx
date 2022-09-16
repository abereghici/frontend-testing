import {fireEvent, render, screen} from '../test';
import {Counter} from './Counter';

test('can increment and decrement the counter', async () => {
  render(<Counter />);

  fireEvent.click(screen.getByText('+'));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1');
  fireEvent.click(screen.getByText('-'));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('0');
});
