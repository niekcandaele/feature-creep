import { FC, useState } from 'react';
import styled from 'styled';

const Container = styled.div`
  position: relative;
  width: 30px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid #cccccc;
  border-radius: 20px;
  margin: 0;
`;

const Inner = styled.span<{ isChecked: boolean }>`
  display: block;
  width: 100%;
  height: 9px;
  background-color: ${({ theme, isChecked }): string => isChecked ? theme.primary : theme.gray};
`;

const Dot = styled.span<{ isChecked: boolean }>`
  display: block;
  width: 18px;
  height: 18px;
  background-color: orange;
  position: absolute;
  margin-top: -4.5px;
  top: 0;
  bottom: 0;
  right: ${({ isChecked }): string => isChecked ? '0px' : '20px'};
  border-radius: 50%;
  transition: all 0.2s ease-in 0s;
`;

export interface ToggleProps {
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ name, defaultChecked = false, disabled = false, onChange }) => {
  const [isChecked, setChecked] = useState(defaultChecked);

  function onCheck(): void {
    setChecked(!isChecked);
    if (typeof onChange === 'function') onChange(isChecked);
  }

  return (
    <Container>
      { /* this is the input component itself, but cannot be styled properly. */}
      <input
        disabled={disabled}
        id={name}
        name={name}
        onChange={onCheck}
        style={{ display: 'none' }}
        type="checkbox"
      >
      </input>
      <Label htmlFor={name} >
        <Inner isChecked={isChecked}>
          <Dot isChecked={isChecked} />
        </Inner>
      </Label>
    </Container>
  );
};
