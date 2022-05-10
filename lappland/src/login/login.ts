import { loginFirstStep } from "./login.first-step";
import { getVerificationToken } from "./login.getVerificationToken";
import { loginSecondStep } from "./login.second-step";

export const login = async (id: string, password: string) => {
  if (id === "" && password === "") {
    return { sessionCookie: "guest", name: "訪客模式" };
  }

  const tokens = await getVerificationToken();
  const { cookieRaw, cookies } = await loginFirstStep(id, password, tokens);
  const cookie = await loginSecondStep({ cookies });
  const name = "(壞掉了，晚點再更新)";

  return { sessionCookie: `${cookieRaw}${cookie}`, name };
};
