import * as React from 'react';
import { createPortal } from 'react-dom';
import { Container, Overlay } from './style';

interface IModalProps {
  isOpen?: boolean;
  elementId: string;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen = false, elementId }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <Overlay>
      <Container
        animate={{ opacity: 1, top: 0, scale: 1 }}
        initial={{ opacity: 0, top: 100, scale: .8 }}
        transition={{ duration: 1, type: 'spring', bounce: .6, stiffness: 500 }}
      >
        {children}
      </Container>
    </Overlay>,
    document.getElementById(elementId) as HTMLElement
  );
};

/* TODO: add types */
export const useModal: any = () => {
  const [isOpen, setOpen] = React.useState(false);

  const open = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const ModalWrapper = React.useCallback(({ children }) => (<Modal elementId="modal" isOpen={isOpen} > { children} </Modal>), [isOpen]);
  return [ModalWrapper, open, close];
};
