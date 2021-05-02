import { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import { Control } from 'react-hook-form';

export interface FieldProps {
  name: string;
  icon?: ReactElement;
  readOnly?: boolean;
  labelText: string;
  placeholder: string;
  error?: FieldError;
  loading?: boolean;
  control: Control<any>;
  required?: boolean;
};
