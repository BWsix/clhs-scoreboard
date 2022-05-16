import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import * as cookie from "../utils/cookie";
import { getAccessToken } from "./auth/login/getAccessToken";

export const createContext = async (ctx: trpcNext.CreateNextContextOptions) => {
  const refreshToken = cookie.get(ctx, "refreshToken");
  let accessToken = cookie.get(ctx, "accessToken");
  const guest = accessToken === "guest";

  const t = Date.now();

  if (refreshToken && !accessToken) {
    accessToken = await getAccessToken(refreshToken);
    cookie.set(ctx, "accessToken", accessToken);
  }

  if (Date.now() - t > 5555) {
    throw new trpc.TRPCError({ code: "TIMEOUT", message: "登入花太久時間了" });
  }

  // Initialize `loggedIn` after updating the cookie to prevent execution timeout
  const loggedIn = accessToken;

  return {
    req: ctx.req,
    res: ctx.res,
    user: {
      loggedIn,
      guest,
      sessionCookie: refreshToken + accessToken,
    },
  };
};

export type RouterContext = trpc.inferAsyncReturnType<typeof createContext>;
