import { FC } from 'react';
import styled from 'styled';
import { Link } from 'components';

const Template = styled.div`
  border-radius: 1rem;
  box-shadow: ${({ theme }): string => theme.shadow};
  background-color: white;
  transition: transform 0.3s ease-in-out;
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      margin-bottom: 15px;
    }
  }
  &:hover {
    transform: translateY(-3px);
  }
`;
const Small = styled(Template)`
  padding: 30px 10px 30px 10px;
  width: 200px;
`;
const Medium = styled(Template)`
  padding: 30px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 350px;
  .text {
    align-items: flex-start;
    margin-left: 30px;
    h3 {
      margin-bottom: 5px;
    }
  }
`;

const Large = styled(Template)`
  width: 400px;
  padding: 20px 20px;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      margin-left: 15px;
      font-size: 2.225rem;
    }
  }
  p {
    margin-bottom: 15px;
  }
  p, a {
    margin-left: 10px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }): string => theme.colors.gray};
  width: fit-content;
  padding: 5px;
  border-radius: 50%;
  margin: 0px auto 15px auto;
`;

export interface CardProps {
  title: string;
  size: 'small' | 'medium' | 'large'
  description: string;
  to?: string;
  linkText?: string;
  icon: React.ReactNode;
}

export const Card: FC<CardProps> = ({ title, description, icon, size, to = '/not-set', linkText = 'not set' }) => {
  switch (size) {
    case 'small':
      return (
        <Small>
          <IconContainer>
            {icon}
          </IconContainer>
          <div className="text">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Small>
      );
    case 'medium':
      return (
        <Medium>
          {icon}
          <div className="text">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Medium>
      );
    case 'large':
      return (
        <Large>
          <div className="title">
            {icon}
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
          <Link arrow text={linkText} to={to} />
        </Large>
      );
  }
};
