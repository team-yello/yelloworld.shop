/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React from 'react';

import { Headline_00 } from '@/component';
import { CooldownPagination } from './pagination';

export default function Page() {
  return (
    <>
      <Headline_00>{'쿨다운'}</Headline_00>
      <CooldownPagination />
    </>
  );
}
