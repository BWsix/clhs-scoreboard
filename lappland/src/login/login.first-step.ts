import got from "got";

const API = "https://eschool.clhs.tyc.edu.tw/auth/Auth/DoLogin";

interface Props {
  validationCookie: string;
  requestVerificationToken: string;
}

export const loginFirstStep = async (
  id: string,
  password: string,
  { requestVerificationToken, validationCookie }: Props
) => {
  const postResult = await got.post(API, {
    headers: {
      cookie: validationCookie,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    form: {
      LoginId: id,
      Password: password,
      __RequestVerificationToken: requestVerificationToken,
      LoginType: "Student",
      IdentityId: undefined,
      IsKeepLogin: true,
      GoogleToken: undefined,
      IsLeaveSchoolStudent: false,
      ChangeAndModifyPwd: false,
      IsTriggerFromReadCard: false,
    },
  });

  if (postResult.headers["set-cookie"] === undefined) {
    throw new Error("錯誤的帳號或密碼");
  }

  try {
    const cookieRawA = postResult.headers["set-cookie"]![0].split(";")[0];
    const cookieRawB = postResult.headers["set-cookie"]![1].split(";")[0];

    return `${cookieRawA}; ${cookieRawB}; `;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
