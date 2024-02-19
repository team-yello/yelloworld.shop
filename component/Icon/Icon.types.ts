import { Property } from 'csstype';
import { SerializedStyles } from '@emotion/react';

export interface IconProps {
  className?: string;
  type: 'svg' | 'png' | 'jpg';
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  color?: Property.BackgroundColor;
  style?: SerializedStyles | React.CSSProperties;
}

export interface SvgProps {
  color?: Property.BackgroundColor;
  width?: number | string;
  height?: number | string;
  src: string;
}
