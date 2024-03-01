import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ButtonProps } from './Button.types';

const getSize = ({ size }: Pick<ButtonProps, 'size'>) => {
  switch (size) {
    case 'None':
      return '';
    case 'XS':
      return css`
        width: 72px;
        height: 24px;
      `;
    case 'S':
      return css`
        width: 84px;
        height: 37px;
      `;
    case 'L':
      return css`
        width: 320px;
        height: 54px;
      `;
    case 'XL':
      return css`
        width: 100%;
        height: 100%;
      `;
  }
};

export const ButtonWrapper = styled.button<
  Omit<ButtonProps, 'children' | 'title'>
>`
  ${(props) => getSize(props)};
  padding-block: 0;
  padding-inline: 0;
  border: 0;
  border-radius: ${(props) => (props.radius ? '12px' : 0)};

  background-color: ${(props) => props.backgroundColor};
  font-weight: 700;

  &:hover {
    opacity: 80%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
  }

  &:active {
    opacity: 40%;
  }

  &:disabled {
    pointer-events: none;
  }

  input[type='submit'] {
    display: none;
  }
`;
