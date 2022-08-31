import {axe} from 'jest-axe';
import {render, screen} from './test';
import App from './app';

test('app render', async () => {
  const {container} = render(<App />);

  expect(screen.getByText('Hello, React')).toBeDefined();
  expect(await axe(container)).toHaveNoViolations();
});
