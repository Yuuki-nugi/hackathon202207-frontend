import client from "./client";
import Cookies from "js-cookie";

import { SignUpParams, SignInParams } from "../interfaces/index";
import { url } from "inspector";
import { AxiosResponse } from "axios";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post("auth/sign_in", params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  const headerAccessToken = Cookies.get("_access_token");
  const headerClient = Cookies.get("_client");
  const headerUid = Cookies.get("_uid");
  if (headerAccessToken && headerClient && headerUid) {
    return client.delete("auth/sign_out", {
      headers: {
        "access-token": headerAccessToken,
        client: headerClient,
        uid: headerUid,
      },
    });
  }
};

export const getWorks = () => {
  return requestGet("/works", null)
};

export const getWork = (id: number) => {
  return requestGet(`/works/${id}`, null)
}

export const updateFeeling = (params: any) => {
  return requestPatch("/feelings", params)
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  return requestGet("/auth/sessions", null)
};

const requestGet = (url: string, params: any | null): Promise<AxiosResponse<any, any>> => {
  const headerAccessToken = Cookies.get("_access_token") || "null";
  const headerClient = Cookies.get("_client") || "null";
  const headerUid = Cookies.get("_uid") || "null";
  if(params){
    return client.get(url,{
      headers:  {
        "access-token": headerAccessToken,
        client: headerClient,
        uid: headerUid,
      },
      params
    });
  } else {
    return client.get(url, {
      headers:  {
        "access-token": headerAccessToken,
        client: headerClient,
        uid: headerUid,
      },
    });
  }
}

const requestPatch = (url: string, params: any | null): Promise<AxiosResponse<any, any>> => {
  const headerAccessToken = Cookies.get("_access_token") || "null";
  const headerClient = Cookies.get("_client") || "null";
  const headerUid = Cookies.get("_uid") || "null";
  if(params){
    return client.patch(url,{
      headers:  {
        "access-token": headerAccessToken,
        client: headerClient,
        uid: headerUid,
      },
      params
    });
  } else {
    return client.patch(url, {
      headers:  {
        "access-token": headerAccessToken,
        client: headerClient,
        uid: headerUid,
      },
    });
  }
}
