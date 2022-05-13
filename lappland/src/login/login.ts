import { loginFirstStep } from "./login.first-step";
import { getVerificationToken } from "./login.getVerificationToken";
import { loginSecondStep } from "./login.second-step";

export const login = async (id: string, password: string) => {
  if (id === "" && password === "") {
    return { sessionCookie: "guest", name: "訪客模式" };
  }

  const tokens = await getVerificationToken();
  const cookies = await loginFirstStep(id, password, tokens);
  const sessionCookie = await loginSecondStep(cookies);
  const name = "取得姓名壞掉了之後再修";

  return { sessionCookie, name };
};
