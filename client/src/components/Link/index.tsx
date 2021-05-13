import { FC } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled';

const Container = styled.div <{ arrow: boolean }>`
  a {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    transition: all .2s ease-in-out;
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
`;

export interface LinkProps {
  to: string;
  arrow?: boolean;
  external?: string;
  className?: string;
}

export const Link: FC<LinkProps> = ({ className, to, arrow = false, external = false, children }) => {
  if (external) {
    return (
      <Container arrow={arrow} className={className}>
        <a href={to} rel="noreferrer noopener" target="_blank" >
          {children}
          {arrow ? <AiOutlineArrowRight size={18} /> : ''}
        </a>
      </Container>
    );
  }

  return (
    <Container arrow={arrow}>
      <ReactRouterLink to={to}>
        {children}
        {arrow ? <AiOutlineArrowRight size={18} /> : ''}
      </ReactRouterLink>
    </Container>
  );
};
