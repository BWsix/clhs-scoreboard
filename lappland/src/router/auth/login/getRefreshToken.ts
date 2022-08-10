import { explode } from "explode.js";
import got from "got";

const getVerificationToken = async () => {
  const API = "https://eschool.clhs.tyc.edu.tw/auth/Auth/Login";

  const getResult = await got.get(API);
  const matchToken = /type="hidden" value="([\-\d\w]+)"/g;
  const requestVerificationToken = matchToken.exec(getResult.body)![1];

  let validationCookie: string | undefined = undefined;
  if (getResult.headers["set-cookie"]) {
    const rawVerificationToken = getResult.headers["set-cookie"].find(
      (cookie) => cookie.includes("Token")
    );
    if (typeof rawVerificationToken !== "string") {
      throw new Error("無法登入，可能是學校系統掛掉或是更新了");
    }

    validationCookie = explode(";", rawVerificationToken)[0];
  }

  if (!requestVerificationToken) {
    throw new Error("無法登入，可能是學校系統掛掉或是更新了");
  }

  return { requestVerificationToken, validationCookie };
};

export const getRefreshToken = async (id: string, password: string) => {
  const API = "https://eschool.clhs.tyc.edu.tw/auth/Auth/DoLogin";

  const tokens = await getVerificationToken();
  const postResult = await got.post(API, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      cookie: tokens.validationCookie,
    },
    form: {
      LoginId: id,
      LoginType: 2,
      IdentityId: undefined,
      IsKeepLogin: true,
      GoogleToken: undefined,
      IsLeaveSchoolStudent: false,
      IdentityIdEncrypt: undefined,
      ChangeAndModifyPwd: false,
      IsTriggerFromReadCard: false,
      Password: password,
      PassString: password,
      __RequestVerificationToken: tokens.requestVerificationToken,
    },
  });

  if (postResult.headers["set-cookie"] === undefined) {
    throw new Error("錯誤的帳號或密碼");
  }

  try {
    const cookieRawA = explode(";", postResult.headers["set-cookie"]![0])[0];
    const cookieRawB = explode(";", postResult.headers["set-cookie"]![1])[0];

    return `${cookieRawA}; ${cookieRawB}; `;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
