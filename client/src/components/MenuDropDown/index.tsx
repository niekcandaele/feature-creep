import { createRef, FC, useState } from 'react';
import { Container, Item, DropDownContainer } from './style';
import { useOutsideAlerter } from 'hooks';
import { usePopper } from 'react-popper';

export interface MenuDropDownProps {
  text: string;
}

export const MenuDropDown: FC<MenuDropDownProps> = ({ children, text }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 20] } }
    ],
  });

  const [visible, setVisible] = useState<boolean>(false);
  const ref = createRef<HTMLDivElement>();
  useOutsideAlerter(ref, () => { setVisible(false); });

  return (
    <Container
      onClick={() => setVisible(!visible)}
      ref={ref}
    >
      <Item
        // @ts-ignore
        ref={setReferenceElement}
        role="link"
      >
        {text}
      </Item>
      {visible &&
        <DropDownContainer
          // animate={visible ? 'open' : 'hidden'}
          // variants={variants}
          // @ts-ignore
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div
            className="arrow"
            // @ts-ignore
            ref={setArrowElement}
            // @ts-ignore
            style={styles.arrow}
          />
          {children}
        </DropDownContainer>
      }
    </Container >
  );
};
