import got from "got";
import { API } from "../constants";
import { decodeBig5 } from "../decodeBig5";

const expiredIndicator = "您尚未登入系統，或者工作階段逾時，請重新登入";

export const isSessionExpired = async (sessionCookie: string) => {
  const checkSessionResult = await got.get(API.CHECK_SESSION, {
    headers: { cookie: sessionCookie },
  });
  const decoded = decodeBig5(checkSessionResult.rawBody);

  return decoded.includes(expiredIndicator);
};
