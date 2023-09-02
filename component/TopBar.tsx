/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Header } from "@primer/react";
import Image from "next/image";
import logo from "../public/app_icon.svg";
import { Headline_00 } from "@/styles/Typography";
import { pallete } from "@/styles/Color";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URL;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;

const TopBar = ({ router }: { router: NextRouter }) => {
  const [isKakaoLogin, setIsKakaoLogin] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = () => {
    if (isKakaoLogin) {
      localStorage.removeItem("accessToken");
      setIsKakaoLogin(false);
    } else {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    }
  };

  const passwordLogin = () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
    } else {
      axios
        .post(`${SERVER_URI}/api/v1/admin/login`, {
          password: prompt("비밀 번호를 입력하세요."),
        })
        .then((res) => {
          alert("로그인에 성공하였습니다!");
          localStorage.setItem("accessToken", res.data.data.accessToken);
          setIsLogin(true);
        })
        .catch((reason) => alert(reason));
    }
  };

  useEffect(() => {
    const { code } = router.query;
    if (localStorage.getItem("accessToken")) {
      // setIsKakaoLogin(true);
      setIsLogin(true);
    }

    if (code) {
      const postLogin = async (accessToken: string) => {
        axios
          .post(`${SERVER_URI}/api/v1/auth/oauth`, {
            social: "KAKAO",
            accessToken: accessToken,
          })
          .then((res) => res.data)
          .then((data) => {
            alert("로그인에 성공하였습니다!");
            localStorage.setItem("accessToken", data.accessToken);
            setIsKakaoLogin(true);
          })
          .catch((reason) => alert(reason));
      };
      const postAuthCode = async () => {
        axios
          .post(
            "https://kauth.kakao.com/oauth/token",
            {
              grant_type: "authorization_code",
              client_id: KAKAO_KEY,
              redirect_uri: REDIRECT_URI,
              code: code,
            },
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            },
          )
          .then((res) => res.data)
          .then((data) => data.access_token)
          .then((kakaoAccessToken) => postLogin(kakaoAccessToken))
          .catch((reason) => alert(reason));
      };

      postAuthCode();
    }
  }, [router]);

  return (
    <>
      <Header sx={{ backgroundColor: pallete.yello_sub_400 }}>
        <Header.Item>
          <Link href="/">
            <Image alt="logo" src={logo} width={48} height={48} />
            <Headline_00>{"Yello 어드민"}</Headline_00>
          </Link>
        </Header.Item>
        <Header.Item>
          <Link href="https://play.google.com/store/apps/details?id=com.el.yello&hl=ko&gl=KR">
            {"Play Store"}
          </Link>
        </Header.Item>
        <Header.Item>
          <Link href="https://apps.apple.com/app/id6451451050">App Store</Link>
        </Header.Item>
        <Header.Item>
          {/* <Button variant="outline" onClick={() => login()}>
            {isKakaoLogin ? "카카오 로그아웃" : "카카오 로그인"}
          </Button> */}
          <Button variant="outline" onClick={() => passwordLogin()}>
            {isLogin ? "비밀번호 로그아웃" : "비밀번호 로그인"}
          </Button>
        </Header.Item>
      </Header>
    </>
  );
};

export default TopBar;
