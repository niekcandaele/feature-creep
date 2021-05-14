import { Story, Meta } from '@storybook/react/types-6-0';
import { Card, CardProps, Button } from 'components';
import create from 'images/emoji/create.png';
import styled from 'styled';

const Inner = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 375px;
  h2, p, img {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

export const CardComponent: Story<CardProps> = () => {
  return (
    <div>
      <Card>
        <Inner>
          <h2>Create a squad</h2>
          <img alt="Create a new squad" src={create} />
          <p>
            You are probably part of an organisation.
            Request the agile coach to join an existing squad.
          </p>
          <Button onClick={() => { }} size="large" text="Create squad" variant="default" />
        </Inner>
      </Card>
    </div>
  );
};

export const CardComponentLink: Story<CardProps> = () => {
  return (
    <div>
      <Card to="/test">
        <Inner>
          <h2>Create a squad</h2>
          <img alt="Create a new squad" src={create} />
          <p>
            You are probably part of an organisation.
            Request the agile coach to join an existing squad.
          </p>
          <Button onClick={() => { }} size="large" text="Create squad" variant="default" />
        </Inner>
      </Card>
    </div>
  );
};
