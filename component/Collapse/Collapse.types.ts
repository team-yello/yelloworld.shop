import { SerializedStyles } from '@emotion/react';

export interface CollapseProps {
  className?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  style?: SerializedStyles | React.CSSProperties;
}
