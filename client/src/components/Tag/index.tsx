import { FC } from 'react';
import styled from 'styled';

/*  TODO:
- add different sizes(small, medium, large)
- variants (filled, outline)z
- colors (theme primary, secondary, tertiary and quaternary)
*/

const Container = styled.div`
  width: fit-content;
  border-radius: 2rem;
  margin: 0 10px;
  padding: 5px 10px;
  background-color: ${({ theme }): string => theme.colors.secondary};
  color: white;
  font-size: ${({ theme }): string => theme.fontSize.small};
`;

export interface TagProps {
  text: string;
}

export const Tag: FC<TagProps> = ({ text }) => {
  return (
    <Container>{text}</Container>
  );
};
