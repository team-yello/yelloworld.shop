'use client';

import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LANDING_PAGE_URL,
} from '@/util/string';
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
      let redirectTo;
      let platform;
      if (isIOS) {
        platform = 'iOS';
        redirectTo = APP_STORE_URL;
      } else if (isAndroid) {
        redirectTo = GOOGLE_PLAY_URL;
        platform = 'Android';
      } else {
        platform = 'others';
        redirectTo = LANDING_PAGE_URL;
      }
      setTimeout(() => {
        const gtag = window.gtag;
        gtag('event', 'download_link', {
          id: params.has('id') ? params.get('id') : 'null',
          platform: platform,
        });
        window.location.replace(redirectTo);
      }, 1000);
    }
  }, [params]);

  return <div>{'data sending..'}</div>;
};
