import {render, axe} from '../test';

function InaccessibleForm() {
  return (
    <form>
      <input />
    </form>
  );
}

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" placeholder="username" />
    </form>
  );
}

test('inaccessible forms fail axe', async () => {
  const {container} = render(<InaccessibleForm />);

  const results = await axe(container);

  expect(results.violations.length).toBeGreaterThan(0);
});

test('accessible forms pass axe', async () => {
  const {container} = render(<AccessibleForm />);
  expect(await axe(container)).toHaveNoViolations();
});
