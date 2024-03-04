import { Property } from 'csstype';

export interface IconProps {
  className?: string;
  type: 'svg' | 'png' | 'jpg';
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  color?: Property.BackgroundColor;
  style?: React.CSSProperties;
}

export interface SvgProps {
  color?: Property.BackgroundColor;
  width?: number | string;
  height?: number | string;
  src: string;
}
