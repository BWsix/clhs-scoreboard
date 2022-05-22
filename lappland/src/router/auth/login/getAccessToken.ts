import { explode } from "explode.js";
import got from "got";

export const getAccessToken = async (refreshToken: string) => {
  const API = "https://eschool.clhs.tyc.edu.tw/";

  try {
    const getResult = await got.head(API + "online/", {
      headers: { cookie: refreshToken },
      followRedirect: false,
    });
    const redirectTo = getResult.headers["location"];
    const sessionId = explode(";", getResult.headers["set-cookie"]![0])[0];
    const accessToken = `${refreshToken}${sessionId}`;

    await got.head(API + redirectTo, {
      headers: { cookie: accessToken },
      followRedirect: false,
    });

    return accessToken;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
