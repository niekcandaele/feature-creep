import { FC } from 'react';
import styled from 'styled';
import { Size } from 'styled/types';

const Container = styled.div<{
  src: string;
  loading: boolean;
  size: Size
}>`
  border-radius: 50%;
  background-image: ${({ src }): string => `url(${src})`};
  background-size: cover;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
        width: 30px;
        height: 30px;
        `;
      case 'medium':
        return `
        width: 45px;
        height: 45px;
        `;
      case 'large':
        return `
          width: 100px;
          height: 100px;
          `;
    }
  }}
`;

export interface AvatarProps {
  size: Size;
  alt?: string;
  loading?: boolean;
  src: string;
}

export const Avatar: FC<AvatarProps> = ({ size, src, loading = false, alt = 'avatar', children }) => {
  // TODO: implement skeleton loading
  return (
    <Container loading={loading} role="img" size={size} src={src}>{children}</Container>
  );
};
