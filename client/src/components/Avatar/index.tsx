import { FC } from 'react';
import styled from 'styled';

const Container = styled.div<{
  // size: 'small' | 'medium' | 'large',
  src: string,
  loading: boolean
}>`
  border-radius: 50%;
  background-image: ${({ src }): string => `url(${src})`};
  background-size: cover;
`;

const SmallContainer = styled(Container)`
    width: 40px;
    height: 40px;
`;
const MediumContainer = styled(Container)`
    width: 60px;
    height: 60px;
`;
const LargeContainer = styled(Container)`
    width: 100px;
    height: 100px;
`;

export interface AvatarProps {
  size: 'small' | 'medium' | 'large';
  alt?: string;
  loading?: boolean;
  src: string;
}

export const Avatar: FC<AvatarProps> = ({ size, src, loading = false, alt = 'avatar' }) => {
  // TODO: implement skeleton loading

  switch (size) {
    case 'small':
      return (
        <SmallContainer loading={loading} role="img" src={src} />
      );
    case 'medium':
      return (
        <MediumContainer loading={loading} role="img" src={src} />
      );
    case 'large':
      return (
        <LargeContainer loading={loading} role="img" src={src} />
      );
  };
};
