'use client';

import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LANDING_PAGE_URL,
} from '@/util/string';
import { sendGTMEvent } from '@next/third-parties/google';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

export default function Page() {
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

  return (
    <>
      <div>{'redirecting...'}</div>
    </>
  );
}
