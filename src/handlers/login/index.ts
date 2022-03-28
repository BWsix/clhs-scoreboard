import got from "got";
import { API } from "src/handlers/constants";
import { checkLoginStatus } from "./checkLoginStatus";
import { getCookie } from "./getCookie";
import { getName } from "./getName";
import { getVerificationToken } from "./getVerificationToken";

export const login = async (id: string, password: string) => {
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
