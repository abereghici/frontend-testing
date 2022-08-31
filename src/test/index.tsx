import {render as rtlRender, RenderOptions} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
export {render, userEvent};
