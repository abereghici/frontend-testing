import {render, screen} from '../test';
import {Modal} from './Modal';

test('modal shows the children', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  );
  expect(screen.getByTestId('test')).toBeInTheDocument();
});
