import type { Response } from "got";

export const checkLoginStatus = (loginResult: Response<string>) => {
  const expires = loginResult.headers.expires;

  if (!expires) {
    throw new Error("錯誤的帳號或密碼");
  }
};
