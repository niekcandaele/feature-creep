import { FC, cloneElement, useState } from 'react';
import { Container, LabelContainer, Label, InputContainer, Input, ErrorContainer, Error } from '../field/style';
import { FieldProps } from '../field';
import { useController } from 'react-hook-form';

export const TextField: FC<FieldProps> = ({
  control,
  labelText,
  placeholder,
  name,
  error,
  icon,
  readOnly,
  required = false,
  loading = false
}) => {
  const [showError, setShowError] = useState(false);
  const { field: { ref, ...inputProps } } = useController({ name, control, defaultValue: placeholder });

  if (loading) {
    return (
      <Container>
        <LabelContainer>
          <Label htmlFor={name} showError={error ? true : false}>{labelText}</Label>
        </LabelContainer>
        <InputContainer className="placeholder" />
      </Container>
    );
  }

  return (
    <Container>
      <LabelContainer>
        <Label htmlFor={name} showError={error ? true : false}>
          {labelText}
          {required && '*'}
        </Label>
      </LabelContainer>
      <InputContainer>
        {icon && cloneElement(icon, { size: 24, className: 'icon' })}
        <Input
          {...inputProps}
          autoCapitalize="off"
          autoComplete="new-password" // >:( Required to disable auto-complete
          hasError={error ? true : false}
          hasIcon={icon ? true : false}
          id={name}
          name={name}
          onBlur={(): void => { setShowError(false); }}
          onFocus={(): void => { setShowError(true); }}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={ref}
          type="search"
        />
      </InputContainer>
      {
        error &&
        <ErrorContainer showError={showError}>
          <Error>{error.message}</Error>
        </ErrorContainer>
      }
    </Container >
  );
};
