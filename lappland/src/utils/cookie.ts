import type { CreateNextContextOptions as CtxType } from "@trpc/server/adapters/next";
import nookies from "nookies";

type CookieNames = "refreshToken" | "accessToken";

const TTL = {
  refreshToken: 60 * 60 * 24 * 29, // Should be 30 days, but I'll keep it 29.
  accessToken: 60 * 15,
};
const isDevMode = process.env.NODE_ENV === "development";
/**
 * @param ttl Time to live (in seconds)
 */
const setCookieConfig = (ttl: number) => ({
  maxAge: ttl,
  path: "/",
  httpOnly: !isDevMode,
  secure: !isDevMode,
  sameSite: !isDevMode,
});
const getCookieConfig = { path: "/" };

export const set = (ctx: CtxType, name: CookieNames, value: string) => {
  nookies.set(ctx, name, value, setCookieConfig(TTL[name]));
};

export const get = (ctx: CtxType, name: CookieNames) => {
  const cookies = nookies.get(ctx, getCookieConfig);
  let value = cookies[name];
  return value;
};

export const destroy = (ctx: CtxType, cookieName: CookieNames) => {
  nookies.destroy(ctx, cookieName, getCookieConfig);
};

export const destroyAll = (ctx: CtxType) => {
  Object.keys(TTL).forEach((name) => {
    destroy(ctx, name as CookieNames);
  });
};
