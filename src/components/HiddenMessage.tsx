import * as React from 'react';
import {CSSTransition} from 'react-transition-group';

function Fade(props: {in: boolean; children: React.ReactNode}) {
  return (
    <CSSTransition unmountOnExit timeout={1000} classNames="fade" {...props} />
  );
}

function HiddenMessage({children}: {children: React.ReactNode}) {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow(s => !s);
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  );
}

export {HiddenMessage};
