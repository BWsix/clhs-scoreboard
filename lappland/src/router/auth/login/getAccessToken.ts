import got from "got";

export const getAccessToken = async (refreshToken: string) => {
  const API = "https://eschool.clhs.tyc.edu.tw/";

  try {
    console.log("Start executing `getAccessToken`"); //TODO remove console.log
    const t = Date.now(); //TODO remove console.log

    const getResult = await got.head(API + "online/", {
      headers: { cookie: refreshToken },
      followRedirect: false,
    });
    const redirectTo = getResult.headers["location"];
    const sessionId = getResult.headers["set-cookie"]![0]!.split(";")[0];
    const accessToken = `${refreshToken}${sessionId}`;

    await got.head(API + redirectTo, {
      headers: { cookie: accessToken },
      followRedirect: false,
    });

    console.log("Finish executing `getAccessToken`: ", Date.now() - t); //TODO remove console.log

    return accessToken;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
