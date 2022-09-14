import {fireEvent, render, screen} from '../test';
import {HiddenMessage} from './HiddenMessage';

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: {in: boolean; children: React.ReactNode}) =>
      props.in ? props.children : null,
  };
});

test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'hello world';
  render(<HiddenMessage>{myMessage}</HiddenMessage>);

  const toggleButton = screen.getByText(/toggle/i);

  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(screen.getByText(myMessage)).toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
});
