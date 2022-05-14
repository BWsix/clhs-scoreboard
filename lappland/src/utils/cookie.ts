import type { CreateNextContextOptions as CtxType } from "@trpc/server/adapters/next";
import nookies from "nookies";

const prefix = (name: TemplateStringsArray) => `token-${name}`;
const COOKIES = {
  refreshToken: {
    name: prefix`refresh`,
    ttl: 60 * 60 * 24 * 5,
  },
  accessToken: {
    name: prefix`access`,
    ttl: 60 * 15,
  },
};
type CookieNames = keyof typeof COOKIES;

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

export const set = (ctx: CtxType, cookieName: CookieNames, value: string) => {
  const { name, ttl } = COOKIES[cookieName];
  nookies.set(ctx, name, value, setCookieConfig(ttl));
};

export const get = (ctx: CtxType, cookieName: CookieNames) => {
  const cookies = nookies.get(ctx, getCookieConfig);
  let value = cookies[COOKIES[cookieName].name];
  return value;
};

export const destroy = (ctx: CtxType, cookieName: CookieNames) => {
  nookies.destroy(ctx, cookieName, getCookieConfig);
};

export const destroyAll = (ctx: CtxType) => {
  for (const cookieName in COOKIES) {
    destroy(ctx, cookieName as CookieNames);
  }
};
