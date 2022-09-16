import {MemoryRouter, BrowserRouter} from 'react-router-dom';
import {fireEvent, render, screen} from '../test';
import {Main} from './Main';

test('main renders about and home and I can navigate those pages', async () => {
  render(<Main />, {wrapper: BrowserRouter});
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i);
  fireEvent.click(screen.getByText(/about/i));
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i);
});

test('landing on a bad page show no match component', async () => {
  const badRoute = '/some/bad/route';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Main />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading')).toHaveTextContent(/404/i);
});
