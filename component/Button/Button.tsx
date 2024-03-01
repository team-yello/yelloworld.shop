import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { ButtonProps } from './Button.types';
import { ButtonWrapper } from './Button.styled';
import { SerializedStyles, css } from '@emotion/react';

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
  (
    {
      type = 'button',
      className,
      size,
      disabled = false,
      radius = true,
      backgroundColor,
      onClick,
      style,
      children,
    }: ButtonProps,
    ref,
  ) => {
    return (
      <>
        <ButtonWrapper
          type={type}
          className={className}
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
          ref={ref}
        >
          {children}
        </ButtonWrapper>
      </>
    );
  },
);
