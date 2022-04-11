import got from "got";
import { API } from "src/handlers/constants";
import { checkLoginStatus } from "./login.checkLoginStatus";
import { getCookie } from "./login.getCookie";
import { getName } from "./login.getName";
import { getVerificationToken } from "./login.getVerificationToken";

export const login = async (id: string, password: string) => {
  if (id === "" && password === "") {
    return { sessionCookie: "guest", name: "訪客模式" };
  }

  const pageResult = await got.get(API.BASE);

  const sessionCookie = getCookie(pageResult);
  const verificationToken = getVerificationToken(pageResult.body);

  const loginResult = await got.post(API.LOGIN, {
    headers: { cookie: sessionCookie },
    form: {
      division: "senior",
      Loginid: id,
      LoginPwd: password,
      __RequestVerificationToken: verificationToken,
    },
  });

  checkLoginStatus(loginResult);
  const name = getName(loginResult.rawBody);

  return { sessionCookie, name };
};
