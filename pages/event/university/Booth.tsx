import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LANDING_PAGE_URL,
} from "@/util/string";
import React, { useEffect } from "react";
import { isAndroid, isIOS } from "react-device-detect";

const Booth = () => {
  useEffect(() => {
    if (isIOS) {
      window.location.href = APP_STORE_URL;
    } else if (isAndroid) {
      window.location.href = GOOGLE_PLAY_URL;
    } else {
      window.location.href = LANDING_PAGE_URL;
    }
  }, []);

  return (
    <>
      <div>{"redirecting..."}</div>
    </>
  );
};

export default Booth;
