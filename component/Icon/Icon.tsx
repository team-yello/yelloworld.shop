'use client';

import React from 'react';
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';

import { IconWrapper } from './Icon.styled';
import { IconProps, SvgProps } from './Icon.types';

/**
 * If you set 'type' as 'svg', you should pass raw svg string data to 'src'
 * for vite environment, add postfix '?raw' at asset importing
 * ref (https://ko.vitejs.dev/guide/assets.html#importing-asset-as-string)
 */
export const Icon = ({
  className,
  type,
  color,
  src,
  alt,
  width,
  height,
  style,
}: IconProps) => {
  return (
    <IconWrapper className={className} style={style}>
      {type === 'svg' ? (
        <Svg color={color} width={width} height={height} src={src} />
      ) : (
        <img width={width} height={height} src={src} alt={alt} />
      )}
    </IconWrapper>
  );
};

const Svg = ({ color, width, height, src }: SvgProps) => {
  const convertSrc = () => {
    const widthToken = 'width';
    const heightToken = 'height';
    const fillToken = 'fill';

    const convertedColor = color;

    const option: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (
          domNode instanceof Element &&
          domNode.attribs &&
          domNode.name === 'svg'
        ) {
          let widthFlag = false;
          let heightFlag = false;
          let fillFlag = false;

          domNode.attributes.forEach((value) => {
            if (value.name === widthToken && width && !widthFlag) {
              domNode.attribs[widthToken] = String(width);
              widthFlag = true;
            }
            if (value.name === heightToken && height && !heightFlag) {
              domNode.attribs[heightToken] = String(height);
              heightFlag = true;
            }
            if (value.name === fillToken && convertedColor && !fillFlag) {
              domNode.attribs[fillToken] = convertedColor;
              fillFlag = true;
            }
          });

          if (!widthFlag && width) domNode.attribs[widthToken] = String(width);
          if (!heightFlag && height)
            domNode.attribs[heightToken] = String(height);
          if (!fillFlag && convertedColor)
            domNode.attribs[fillToken] = convertedColor;
        }

        return domNode;
      },
    };

    return parse(src, option);
  };

  return convertSrc();
};
