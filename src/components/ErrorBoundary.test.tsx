import {fireEvent, render, screen} from '../test';
import {ErrorBoundary} from './ErrorBoundary';
import {reportError} from '../api';

// TODO: fix types once https://github.com/aelbore/esbuild-jest/issues/57 is fixed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportErrorMock = reportError as jest.MockedFunction<any>;

function Bomb({shouldThrow}: {shouldThrow: boolean}) {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return null;
  }
}

jest.mock('../api');

let consoleSpy: jest.SpyInstance;

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleSpy.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('calls reportError and renders that there was a problem', async () => {
  reportErrorMock.mockResolvedValueOnce({success: true});

  const {rerender} = render(<Bomb shouldThrow={false} />, {
    wrapper: ErrorBoundary,
  });

  rerender(<Bomb shouldThrow={true} />);

  const error = expect.any(Error);
  const info = {componentStack: expect.stringContaining('at shouldThrow')};
  expect(reportErrorMock).toHaveBeenCalledWith(error, info);
  expect(reportErrorMock).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledTimes(3);

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  );

  consoleSpy.mockClear();
  reportErrorMock.mockClear();

  rerender(<Bomb shouldThrow={false} />);

  fireEvent.click(screen.getByText(/try again/i));

  expect(reportErrorMock).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
});
