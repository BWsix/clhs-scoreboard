import got from "got";

export const getAccessToken = async (refreshToken: string) => {
  const API = "https://eschool.clhs.tyc.edu.tw/";

  try {
    const getResult = await got.get(API + "online/", {
      headers: { cookie: refreshToken },
      followRedirect: false,
    });
    const redirectTo = getResult.headers["location"];
    const accessToken = getResult.headers["set-cookie"]![0]!.split(";")[0];
    const sessionCookie = `${refreshToken}${accessToken}`;

    await got.get(API + redirectTo, {
      headers: { cookie: sessionCookie },
      followRedirect: false,
    });

    return sessionCookie;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
