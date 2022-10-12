import {act, render} from '../test';
import {Countdown} from './Countdown';

let consoleSpy: jest.SpyInstance;

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleSpy.mockRestore();
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

test('does not attempt to set state when unmounted (to prevent memory leaks)', async () => {
  jest.useFakeTimers();
  const {unmount} = render(<Countdown />);
  unmount();
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(console.error).not.toHaveBeenCalled();
});
