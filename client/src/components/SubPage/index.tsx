import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, ContentContainer } from './style';
import { FaLongArrowAltLeft as ArrowLeft } from 'react-icons/fa';

export interface SubPageProps {
  title: string;
}
export const SubPage: FC<SubPageProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* Goes back to the previous page. For some reason this is val -1*/}
      <Title onClick={() => navigate(-1)}><ArrowLeft color="white" size={32} /><span>{title}</span></Title>
      <ContentContainer>
        {children}
      </ContentContainer>
    </Container>
  );
};
