import {act, render} from '../test';
import {useCounter, type Props} from './useCounter';

// TODO: Replace with renderHook once the API is included in testing-library
// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
function setup(initialProps: Props = {}) {
  const result: {current?: ReturnType<typeof useCounter>} = {};

  function TestComponent(props: Props) {
    result.current = useCounter(props);
    return null;
  }

  render(<TestComponent {...initialProps} />);

  return result as {current: ReturnType<typeof useCounter>};
}

test('exposes the count and increment/decrement functions', async () => {
  const result = setup();

  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test('allows customization of the initial count', async () => {
  const result = setup({initialCount: 3});

  expect(result.current.count).toBe(3);
});

test('allows customization of the step', async () => {
  const result = setup({step: 3});

  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
