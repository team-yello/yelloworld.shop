'use client';

import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LANDING_PAGE_URL,
} from '@/util/string';
import { sendGTMEvent } from '@next/third-parties/google';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

export default function Page() {
  return (
    <>
      <div>{'redirecting...'}</div>
      <Suspense>
        <GTMComponent />
      </Suspense>
    </>
  );
}

const GTMComponent = () => {
  const params = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let platform;
      if (isIOS) {
        window.location.replace(APP_STORE_URL);
        platform = 'iOS';
      } else if (isAndroid) {
        window.location.replace(GOOGLE_PLAY_URL);
        platform = 'Android';
      } else {
        window.location.replace(LANDING_PAGE_URL);
        platform = 'others';
      }
      sendGTMEvent({
        id: params.get('id'),
        platform: platform,
        from: document.referrer,
      });
    }
  }, [params]);

  return <div>{'data sending..'}</div>;
};
