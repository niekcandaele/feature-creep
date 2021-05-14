import { FC, useState, useEffect, useContext } from 'react';
import styled from 'styled';
import { ThemeType } from 'styled/theme';
import { BiClipboard as ClipBoardIcon } from 'react-icons/bi';
import { AiOutlineCheck as CheckMarkIcon } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import { useSnackbar } from 'notistack';

const Container = styled.div<{ maxWidth: number }>`
  position: relative;
  padding: 0;
  outline: 0;
  width: fit-content;
  input {
    display: block;
    max-width: ${({ maxWidth }): number => maxWidth}px;
    padding: 8px 30px 8px 8px;
    border: 1px solid ${({ theme }): string => theme.colors.gray};
    color: gray;
    cursor: default;
    &:hover {
      cursor: default;
    }
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 7px;
  right: 7px;
  svg {
    fill: ${({ theme }): string => theme.colors.primary};
    stroke: ${({ theme }): string => theme.colors.primary};
    cursor: pointer;
  }
`;

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
    <Container maxWidth={maxWidth} role="button" tabIndex={-1} >
      <input
        aria-describedby="clipboard-input-error"
        aria-invalid="false"
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
