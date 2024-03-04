'use client';

import React from 'react';

export const Spacing = ({ size }: { size: number }) => {
  return <div style={{ width: `${size}px`, height: `${size}px` }}></div>;
};
