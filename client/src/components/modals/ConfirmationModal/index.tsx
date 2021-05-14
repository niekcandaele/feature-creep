import { forwardRef, MutableRefObject, useState } from 'react';
import { Button } from 'components';
import { Container, Header, ActionContainer, Cancel, Description } from './style';
import { useLockBodyScroll } from 'hooks';
import { AiOutlinePlus as Plus } from 'react-icons/ai';

interface IProps {
  title: string;
  description?: string;
  action: () => any;
  actionText: string;
  icon?: React.ReactNode;
  close: () => void;
  ref: MutableRefObject<HTMLDivElement>
  type?: 'danger' | 'info'
}

export const ConfirmationModal = forwardRef<HTMLDivElement, IProps>(({ title, description, action, close, actionText, type = 'info' }, ref) => {
  useLockBodyScroll();
  const [loading, setLoading] = useState<boolean>(false);

  async function confirmAction(): Promise<void> {
    setLoading(true);
    await action();
    setLoading(false);
    close();
  }

  return (
    <Container
      aria-describedby={description}
      aria-labelledby={title}
      ref={ref}
    >
      <Header type={type}>
        <h2>{title}</h2>
        <Plus onClick={close} />
      </Header>
      <Description>{description}</Description>
      <ActionContainer type={type}>
        <Cancel onClick={close}>Cancel</Cancel>
        <Button isLoading={loading} onClick={confirmAction} text={actionText} />
      </ActionContainer>
    </Container>
  );
});
