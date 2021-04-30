import { FC } from 'react';
import styled from 'styled';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
const Container = styled.div <{ arrow: boolean }>`
  a {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    &:hover {
      color: white;
      span {
        color: white;
      }
    }
  }
  span {
    font-size: inherit;
  }
  svg { transform: rotate(90deg); }
`;

export interface LinkProps {
  to: string;
  arrow?: boolean;
  external?: string;
  text: string;
  className?: string;
}

export const Link: FC<LinkProps> = ({ className, to, arrow = false, external = false, text }) => {
  if (external) {
    return (
      <Container arrow={arrow} className={className}>
        <a href={to} rel="noreferrer noopener" target="_blank" >
          <span>{text}</span>
          {arrow ? <AiOutlineArrowRight size={24} /> : ''}
        </a>
      </Container>
    );
  }

  return (
    <Container arrow={arrow}>
      <ReactRouterLink to={to}>
        <span>{text}</span>
        {arrow ? <AiOutlineArrowRight size={24} /> : ''}
      </ReactRouterLink>
    </Container>
  );
};
