'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '../Button';
import { Icon } from '../Icon';
import chevronDown from '../Icon/asset/chevron-down-gray400.svg';

import { CollapseProps } from './Collapse.types';
import { CollapseWrapper } from './Collapse.styled';

export const Collapse = ({
  className,
  title,
  children,
  style,
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <CollapseWrapper className={className}>
      <Button
        className='flex items-center justify-center'
        size='L'
        radius={false}
        backgroundColor='--white'
        onClick={handleClick}
        style={{
          border: '0',
          width: 'unset',
          ...style,
        }}
      >
        <div className='ml-3'>{title}</div>
        <Image className='mr-3' src={chevronDown} alt='chevron_down' />
      </Button>
      <div
        ref={contentRef}
        className='flex flex-col w-full items-center'
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
          transition: 'max-height 0.3s ease',
        }}
      >
        {children}
      </div>
    </CollapseWrapper>
  );
};
