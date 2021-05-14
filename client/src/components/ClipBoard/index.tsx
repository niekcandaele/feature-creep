import { FC, useState, useEffect } from 'react';
import { Container, IconContainer } from './style';
import { BiClipboard as ClipBoardIcon } from 'react-icons/bi';
import { AiOutlineCheck as CheckMarkIcon } from 'react-icons/ai';
import { useSnackbar } from 'notistack';

export interface ClipBoardProps {
  text: string;
  /* Width in px before the text should be cut off */
  maxWidth: number;
}

export const ClipBoard: FC<ClipBoardProps> = ({ text, maxWidth }) => {
  const [copied, setCopied] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function handleCopy() {
    enqueueSnackbar('Invite link has been copied to the clipboard. 🔗', { variant: 'info' });
    setCopied(true);
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    /* If it was copied, show a checkmark for 2.5s thn make it possible to copy again */
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  return (
    <Container copied={copied} maxWidth={maxWidth} role="button" tabIndex={-1} >
      <input
        aria-describedby="clipboard-input-error"
        aria-invalid="false"
        onClick={(e: any) => e.target.select()}
        readOnly
        type="text"
        value={text}
      />
      <IconContainer>
        {
          copied ?
            <CheckMarkIcon size={18} />
            :
            <ClipBoardIcon onClick={handleCopy} size={18} />
        }
      </IconContainer>
    </Container>
  );
};
