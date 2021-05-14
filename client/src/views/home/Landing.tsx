import { FC, useState, useEffect } from 'react';
import styled from 'styled';
import { AnimatePresence, motion } from 'framer-motion';
import useSound from 'use-sound';

// images
import thumbsUp from 'images/emoji/thumbs-up.png';
import thumbsDown from 'images/emoji/thumbs-down.png';
import fire from 'images/emoji/fire.png';
import sad from 'images/emoji/sad.png';
import neutral from 'images/emoji/neutral.png';
import ghost from 'images/emoji/ghost.png';
import { Card } from './Card';
import { useTheme } from 'hooks';
import { AiOutlineArrowLeft as ArrowLeft, AiOutlineArrowRight as ArrowRight } from 'react-icons/ai';

import sheesh from 'sounds/sheesh.mp3';

const Container = styled.div<{ color: string }>`
  position: relative;
  padding: 10rem 25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;

  strong {
    color: ${({ color }): string => color};
    border-bottom: 7px solid ${({ color }): string => color};
    border-radius: .4rem;
    transition: all .2s ease-in-out;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Cards = styled.div`
  position: relative;
  width: 300px;
  height: 430px;
`;

const Swipe = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

  p{
    font-style: italic;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin: 0 .5rem;
    svg {
      fill: white;
      stroke: white;
    }
    span {
      font-style: normal;
    }
  }
`;

const Svg = styled.svg`
  position: absolute;
  left:-250px;
  bottom: -300px;
  z-index: 0;
  path {
    transition: fill .2s ease-in-out;
  }
`;

export const Landing: FC = () => {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState('100%');
  const theme = useTheme();
  const [play] = useSound(sheesh, { volume: .1 });

  useEffect(() => {
    if (index === 1) {
      play();
    };
  }, [index]);
  const colors = ['primary', 'secondary', 'tertiary', 'quaternary'];

  const cards = [
    {
      icon: fire,
      title: 'Very good',
      description: 'add a short description here'
    },
    {
      icon: thumbsUp,
      title: 'Good',
      description: 'add a short description here'
    },
    {
      icon: neutral,
      title: 'Neutral',
      description: 'add a short description here'
    },
    {
      icon: thumbsDown,
      title: 'Bad',
      description: 'add a short description here'
    },
    {
      icon: sad,
      title: 'Very bad',
      description: 'add a short description here'
    },
    {
      icon: ghost,
      title: 'Scared',
      description: 'add a short description here'
    }
  ];

  return (
    <Container
      // @ts-ignore
      color={theme.colors[colors[index % colors.length]]}
    >
      <Svg
        height="600"
        id="visual"
        version="1.1"
        viewBox="0 0 900 600"
        width="900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(400.0411365004835 326.3364766795198)">
          <path
            d="M185.5 -141.4C246.4 -71.5 306 6 295.8 74.2C285.5 142.4 205.5 201.4 131 215.7C56.5 229.9 -12.4 199.4 -70.5 164.5C-128.7 129.6 -176 90.3 -191.3 39.1C-206.7 -12.2 -190.1 -75.3 -152.9 -139.8C-115.7 -204.3 -57.9 -270.1 2.2 -271.9C62.3 -273.7 124.6 -211.3 185.5 -141.4"
            // @ts-ignore
            fill={theme.colors[colors[index % colors.length]]}
          >
          </path>
        </g>
      </Svg>
      <h1>Do not hide your <br /> problems in the <strong >Dark!</strong></h1>
      <Wrapper>
        <Cards>
          <motion.div />
          <AnimatePresence initial={false}>
            {/* @ts-ignore */}
            <Card
              animate={{ scale: 1, x: 30, y: -30, opacity: .8 }}
              cardDetails={cards[(index + 2) % cards.length]}
              index={index + 2}
              initial={{ scale: 0, y: 500, opacity: 0 }}
              key={index + 2}
              transition={{
                scale: { duration: 0.2 },
                opacity: { duration: 0.4 }
              }}
            />
            {/* @ts-ignore */}
            <Card
              animate={{ scale: 1, x: 20, y: -20, opacity: 1 }}
              cardDetails={cards[(index + 1) % cards.length]}
              index={index + 1}
              initial={{ scale: 0, y: 500, opacity: 0 }}
              key={index + 1}
              transition={{
                scale: { duration: 0.2 },
                opacity: { duration: 0.4 }
              }}
            />
            <Card
              animate={{ scale: 1, y: 0, opacity: 1 }}
              cardDetails={cards[index % cards.length]}
              drag="x"
              exitX={exitX}
              index={index}
              key={index}
              setExitX={setExitX}
              setIndex={setIndex}
              transition={{
                // @ts-ignore
                type: 'spring',
                // @ts-ignore
                stiffness: 500,
                // @ts-ignore
                damping: 20,
                // @ts-ignore
                opacity: {
                  duration: 0.2
                }
              }}
            />
          </AnimatePresence>
        </Cards>
        <Swipe>
          <ArrowLeft size={24} />
          {index === 0 ?
            <p>swipe the cards <span>🥺</span> </p>
            :
            <p>SHEEEEEESH!!!</p>
          }
          <ArrowRight size={24} />
        </Swipe>
      </Wrapper>
    </Container >
  );
};
