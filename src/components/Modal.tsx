import React from 'react';
import ReactDOM from 'react-dom';

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

export function Modal({children}: {children: React.ReactNode}) {
  const el = React.useRef(document.createElement('div'));

  React.useLayoutEffect(() => {
    const currentEl = el.current;
    modalRoot?.appendChild(currentEl);
    return () => {
      modalRoot?.removeChild(currentEl);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
}
