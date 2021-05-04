import styled from 'styled';

export const Item = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  transition: color .2s ease-in-out;
  &:hover {
    color: white;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover ${Item} {
    color: white;
  }
`;

export const DropDownContainer = styled.div`
  position: absolute;
  min-width: 100px;
  min-height: 48px;
  width: auto;
  height: auto;
  border-radius: 1rem;
  padding: 10px;
  background-color: white;
  box-shadow: ${({ theme }): string => theme.shadow};

  &[data-popper-placement^='top'] > .arrow {
    bottom: -30px;
      :after {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      }
    }

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    &:after {
      content: " ";
      position: absolute;
      top: -15px; // we account for the PopperContainer padding
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    }
  }
`;
