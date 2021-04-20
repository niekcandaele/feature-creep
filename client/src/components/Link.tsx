import { FC } from 'react';
import styled from 'styled';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Icon } from 'components';

export interface LinkProps {
  to: string;
  arrow?: boolean;
  external?: string;
  text: string;
}

const Container = styled.div <{ arrow: boolean }>`
  a {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
  }
  svg { transform: rotate(90deg); }
`;

export const Link: FC<LinkProps> = ({ to, arrow = false, external = false, text }) => {
  if (external) {
    return (
      <Container arrow={arrow}>
        <a href={to} rel="noreferrer noopener" target="_blank" >
          <span>{text}</span>
          {arrow ? <Icon glyph="arrow-right" size={24} /> : ''}
        </a>
      </Container>
    );
  }

  return (
    <Container arrow={arrow}>
      <ReactRouterLink to={to}>
        <span>{text}</span>
        {arrow ? <Icon glyph="arrow-right" size={24} /> : ''}
      </ReactRouterLink>
    </Container>
  );
};
