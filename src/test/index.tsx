import {
  render as rtlRender,
  RenderOptions,
  waitFor,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import {axe} from 'jest-axe';

function render(
  ui: React.ReactElement,
  {...options}: Omit<RenderOptions, 'queries'> = {},
) {
  function Wrapper({children}: {children: React.ReactNode}) {
    return <>{children}</>;
  }

  return rtlRender(ui, {wrapper: Wrapper, ...options});
}

export * from '@testing-library/react';

// override the built-in render with our own
export {render, user, axe, waitFor};
