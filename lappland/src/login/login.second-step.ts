import got from "got";

const API = "https://eschool.clhs.tyc.edu.tw/";

export const loginSecondStep = async (cookie: string) => {
  try {
    const getResult = await got.get(API + "online/", {
      headers: { cookie },
      followRedirect: false,
    });
    const redirectTo = getResult.headers["location"];
    const _sessionCookie = getResult.headers["set-cookie"]![0]!.split(";")[0];
    const sessionCookie = `${cookie}${_sessionCookie}`;

    await got.get(API + redirectTo, {
      headers: { cookie: sessionCookie },
      followRedirect: false,
    });

    return sessionCookie;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
