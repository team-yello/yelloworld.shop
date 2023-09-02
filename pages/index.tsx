import styled from "styled-components";
import { ActionList, Header } from "@primer/react";
import Image from "next/image";
import logo from "../public/app_icon.svg";
import { Headline_00 } from "@/styles/Typography";
import { pallete } from "@/styles/Color";
import TopBar from "@/component/TopBar";
import Menu from "@/component/Menu";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <TopBar router={router} />
      <div style={{ display: "flex" }}>
        <Menu />
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Headline_00>{"Yello 어드민에 오신걸 환영합니다."}</Headline_00>
        </div>
      </div>
    </>
  );
}
