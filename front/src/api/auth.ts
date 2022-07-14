import client from "./client";
import Cookies from "js-cookie";

import { SignUpParams, SignInParams } from "../interfaces/index";

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

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  const headerAccessToken = Cookies.get("_access_token");
  const headerClient = Cookies.get("_client");
  const headerUid = Cookies.get("_uid");
  if (headerAccessToken && headerClient && headerUid) {
    return client.get("/auth/sessions", {
      headers: {
        "access-token": headerAccessToken,
        client: headerClient,
        uid: headerUid,
      },
    });
  }
};
