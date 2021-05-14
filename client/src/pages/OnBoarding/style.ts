import styled from 'styled';
import { hovering } from 'animations';

export const Container = styled.div`
  height: 100vh;
  position: relative;
  background:#141628;
 svg.link {
    position: absolute;
    left: 10%;
    top: 125px;
    animation: ${hovering(10, 10)} 2s alternate infinite ease-in-out;
    fill: white;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
box-shadow: ${({ theme }) => theme.shadow};
border-radius: 2rem;
width: 1000px;
height: 700px;
display: flex;
flex-direction:row;
align-items: center;
`;

export const Image = styled.div`
  background:${({ theme }): string => theme.gradient.primary};
  width: 400px;
  height: 100%;
  border-top-left-radius: 3rem;
  border-bottom-left-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.huge};
  font-weight: 900;
`;
export const Content = styled.div`
  background-color: ${({ theme }): string => theme.colors.background};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 0;
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;

  form {
    width: 80%;
    margin: 0 auto;
  }

  h2 {
    font-size: 4rem;
    margin-bottom: 2.5rem;
  }
  p {
    color: white;
    width: 62%; // fix this
    margin: 0 auto;
    text-align: center;
    margin-bottom: 5rem;
  }
`;
