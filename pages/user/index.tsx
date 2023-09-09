/* eslint-disable react-hooks/rules-of-hooks */
import Menu from "@/component/Menu";
import TopBar from "@/component/TopBar";
import { pallete } from "@/styles/Color";
import {
  BodyMedium,
  Headline_00,
  Headline_01,
  Headline_02,
  Subtitle_01,
  Subtitle_02,
} from "@/styles/Typography";
import { SearchIcon, TrashIcon } from "@primer/octicons-react";
import {
  ActionList,
  Avatar,
  Button,
  Pagination,
  Spinner,
  TextInput,
} from "@primer/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

interface User {
  id: number;
  name: string;
  yelloId: string;
  group: string;
  imageUrl: string;
  createdAt: string;
  deletedAt: string;
}

interface UserResponse {
  pageCount: number;
  totalCount: number;
  userList: User[];
}

interface Response {
  status: number;
  message: string;
  data: UserResponse;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const UserPagination = ({
  searchYelloId,
}: {
  searchYelloId: string | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const router = useRouter();

  const userFetcher = async ({ queryKey }: { queryKey: any }) => {
    const [_key, { page, yelloId }] = queryKey;
    return axios
      .get(`${BASE_URL}/api/v1/admin/user`, {
        params: {
          page: page,
          yelloId: yelloId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => res.data);
  };
  const { isLoading, isError, data, error } = useQuery<
    Response,
    AxiosError<Response>
  >(["user", { page: currentPage, yelloId: searchYelloId }], userFetcher, {
    retry: false,
  });

  if (isLoading) {
    return (
      <Spinner size={"large"} sx={{ padding: "100px 150px 100px 150px" }} />
    );
  }

  if (isError) {
    return (
      <>
        <div
          style={{
            backgroundColor: pallete.semantic_red_100,
            padding: "100px 150px 100px 150px",
            borderRadius: "20px",
          }}
        >
          <Headline_00>에러</Headline_00>
          <Subtitle_01 style={{ color: pallete.semantic_red_500 }}>
            {error.response?.data?.message}
          </Subtitle_01>
        </div>
      </>
    );
  }

  const onClickDelete = (userId: number) => {
    if (confirm(userId + "를 삭제하시겠습니까?")) {
      axios
        .delete(`${BASE_URL}/api/v1/admin/user`, {
          params: {
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => alert(res.data.message))
        .catch((reason) => {
          alert(reason.response.data.message);
        });
    }
  };

  return (
    <>
      <ActionList>
        <ActionList.Item
          sx={{
            width: "850px",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: `1px solid ${pallete.grayscales_300}`,
            backgroundColor: pallete.grayscales_300,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Headline_02>{"id"}</Headline_02>
            <Subtitle_01 style={{ marginLeft: "20px", width: "150px" }}>
              {"옐로 아이디"}
            </Subtitle_01>
            <BodyMedium style={{ marginLeft: "30px" }}>{"이름"}</BodyMedium>
          </div>
        </ActionList.Item>
        {data?.data.userList.length === 0 ? (
          <ActionList.Item>
            <ActionList.LeadingVisual>
              <TrashIcon size={24} />
            </ActionList.LeadingVisual>
            <ActionList.Description>
              {"검색 결과가 없습니다."}
            </ActionList.Description>
          </ActionList.Item>
        ) : (
          data?.data.userList.map((user, index) => {
            return (
              <ActionList.Item
                key={user.id + index}
                sx={{
                  width: "850px",
                  height: "50px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onClick={() => {
                  router.push(`/user/${user.id}`);
                }}
              >
                <ActionList.LeadingVisual>
                  <Headline_02>{user.id}</Headline_02>
                </ActionList.LeadingVisual>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Subtitle_01 style={{ marginLeft: "12px", width: "150px" }}>
                    {"@" + user.yelloId}
                  </Subtitle_01>
                  <BodyMedium style={{ marginLeft: "30px" }}>
                    {user.name}
                  </BodyMedium>
                  <div style={{ margin: "0 30px 0 30px" }}>
                    {"가입일 : " + user.createdAt}
                  </div>
                  <div style={{ margin: "0 30px 0 30px" }}>
                    {"탈퇴일 : " + user.deletedAt}
                  </div>
                </div>
                <ActionList.TrailingVisual>
                  <Button onClick={() => onClickDelete(user.id)}>
                    {"삭제"}
                  </Button>
                </ActionList.TrailingVisual>
              </ActionList.Item>
            );
          })
        )}
      </ActionList>
      <Pagination
        pageCount={
          data?.data.pageCount === 0 ? 1 : (data?.data.pageCount as number)
        }
        currentPage={currentPage + 1}
        onPageChange={(e, page) => {
          setCurrentPage(page - 1);
        }}
      />
    </>
  );
};

const index = () => {
  const [searchYelloId, setSearchYelloId] = useState<string>("");
  const router = useRouter();
  let inputField = useRef<string>("");

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
          <Headline_00>{"유저"}</Headline_00>
          <UserPagination
            searchYelloId={searchYelloId === "" ? undefined : searchYelloId}
          />
          <TextInput
            aria-label="yelloId"
            name="yelloId"
            placeholder="옐로 아이디로 검색하기"
            autoComplete="yelloId"
            size="large"
            onChange={(e) => {
              inputField.current = e.target.value;
            }}
            trailingAction={
              <TextInput.Action
                onClick={(e) => setSearchYelloId(inputField.current)}
                icon={SearchIcon}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default index;
