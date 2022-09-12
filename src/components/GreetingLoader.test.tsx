import {fireEvent, render, screen, waitFor} from '../test';
import {loadGreeting} from '../api';
import {GreetingLoader} from './GreetingLoader';

jest.mock('../api');

// TODO: fix types once https://github.com/aelbore/esbuild-jest/issues/57 is fixed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockLoadGreeting = loadGreeting as jest.MockedFunction<any>;

test('loads greetings on click', async () => {
  const testGreeting = 'Hello';

  mockLoadGreeting.mockResolvedValueOnce({
    data: {
      greeting: testGreeting,
    },
  });

  render(<GreetingLoader />);

  const nameInput = screen.getByLabelText<HTMLInputElement>(/name/i);
  const loadButton = screen.getByText(/load/i);

  nameInput.value = 'Mary';
  fireEvent.click(loadButton);

  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(testGreeting);
  });
});
