import { FC } from 'react';
import styled from 'styled';

const Container = styled.div<{ src: string }>`
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
  loading: boolean;
  src: string;
}

export const Avatar: FC<AvatarProps> = ({ size, src, loading, alt = 'avatar' }) => {
  // TODO: implement skeleton loading
  switch (size) {
    case 'small':
      return (
        <SmallContainer role="img" src={src} />
      );
    case 'medium':
      return (
        <MediumContainer role="img" src={src} />
      );
    case 'large':
      return (
        <LargeContainer role="img" src={src} />
      );
  };
};
