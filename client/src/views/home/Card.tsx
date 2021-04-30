import { FC, Dispatch, SetStateAction } from 'react';
import styled from 'styled';
import { useTheme } from 'hooks';
import { motion, useMotionValue, useTransform, MotionProps } from 'framer-motion';

const CardContainer = styled(motion.div)`
  width: 300px;
  height: 400px;
  position: absolute;
  top: 0;
  cursor: grab;
`;

const StyledCard = styled(motion.div)`
  padding: 5rem 2rem;
 h2 {
   text-align: center;
   color: white;
   margin-bottom: 25px;
   user-select: none;
   pointer-events: none;
 }

 img {
   margin: 0 auto;
   pointer-events: none;
   user-select: none;
   margin-bottom: 20px;
 }


 p {
   text-align: center;
   font-weight: 600;
   font-size: ${({ theme }) => theme.fontSize.small};
   color: white;
 }
`;

interface CardDetails {
  title: string;
  icon: string;
  description: string;
}

interface CardProps extends MotionProps {
  cardDetails: CardDetails;
  // exit State
  exitX: string;
  setExitX: Dispatch<SetStateAction<string>>
  // index State
  index: number;
  setIndex: Dispatch<SetStateAction<number>>
}

export const Card: FC<CardProps> = ({
  animate,
  drag,
  initial,
  transition,
  exitX,
  setExitX,
  index,
  setIndex,
  cardDetails: { description, icon, title }
}) => {
  const theme = useTheme();
  const x = useMotionValue(0);
  const scale = useTransform(x, [-250, 0, 250], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-250, 0, 250], [-45, 0, 45], { clamp: false });

  function handleDragEnd(event: any, info: any) {
    if (info.offset.x < -250) {
      setExitX('-250');
      setIndex(index + 1);
    }
    if (info.offset.x > 150) {
      setExitX('250');
      setIndex(index + 1);
    }
  }

  const colors = ['primary', 'secondary', 'tertiary', 'quaternary'];

  return (
    <CardContainer
      animate={animate}
      drag={drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      exit={{ x: exitX, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      initial={initial}
      onDragEnd={handleDragEnd}
      style={{
        x: x,
        rotate: rotate
      }}
      transition={transition}
      whileTap={{ cursor: 'grabbing' }}
    >
      <StyledCard
        style={{
          width: 300,
          height: 400,
          // @ts-ignore
          backgroundColor: theme.colors[colors[index % colors.length]],
          borderRadius: 30,
          scale: scale
        }}
      >
        <h2>{title}</h2>
        <div className="image-container">
          <img alt="icon" src={icon} />
        </div>
        <p>{description}</p>
      </StyledCard>
    </CardContainer >
  );
};
