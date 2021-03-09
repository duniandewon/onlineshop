import React, { useRef, useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';

export interface Modal_I {
  children?: React.ReactChild | React.ReactChild[];
  onClose: () => void;
  isOpen: boolean;
}

const Modal = ({ children, onClose, isOpen }: Modal_I) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#modal');
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const _renderPortal = () =>
    isOpen && (
      <Fragment>
        <div className="modal__overlay" onClick={onClose} />
        <div className="modal">{children}</div>
      </Fragment>
    );

  return mounted ? ReactDOM.createPortal(_renderPortal(), ref.current) : null;
};

export default Modal;
