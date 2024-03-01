import { SerializedStyles } from '@emotion/react';
import { Property } from 'csstype';

export interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  size: 'None' | 'XS' | 'S' | 'L' | 'XL';
  disabled?: boolean;
  radius?: boolean;
  backgroundColor: Property.BackgroundColor;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: SerializedStyles | React.CSSProperties;
  children?: React.ReactNode;
  isSubmit?: boolean;
}
