import React from 'react';
import classNames from 'classnames';

import { ButtonProps } from './Button.types';
import { ButtonWrapper } from './Button.styled';
import { SerializedStyles, css } from '@emotion/react';

export const Button = ({
  type = 'button',
  className,
  size,
  disabled = false,
  radius = true,
  backgroundColor,
  onClick,
  style,
  children,
}: ButtonProps) => {
  return (
    <>
      <ButtonWrapper
        type={type}
        className={classNames(className)}
        size={size}
        disabled={disabled}
        radius={radius}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        backgroundColor={backgroundColor}
        css={style as SerializedStyles}
      >
        {children}
      </ButtonWrapper>
    </>
  );
};
