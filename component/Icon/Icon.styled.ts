import styled from '@emotion/styled';
import { IconProps } from '.';

export const IconWrapper = styled.div<Pick<IconProps, 'style'>>`
  width: fit-content;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;
`;
