import { TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import nookies from "nookies";

//! "name", "id" and "password" are now deprecated
type CookieNames = "sessionCookie" | "name" | "id" | "password";

const withPrefix = (name: CookieNames) => "sb-" + name;
const isDevMode = process.env.NODE_ENV === "development";
const cookieConfig = {
  maxAge: 60 * 15, // 15 minutes
  path: "/",
  httpOnly: !isDevMode,
  secure: !isDevMode,
  sameSite: !isDevMode,
};

export const getCookie = (ctx: CreateNextContextOptions, name: CookieNames) => {
  const cookies = nookies.get(ctx, { path: "/" });

  return cookies[withPrefix(name)];
};

export const getSessionCookie = (
  ctx: CreateNextContextOptions
): string | null => {
  const sessionCookie = getCookie(ctx, "sessionCookie");

  return sessionCookie;
};

export const setSessionCookie = (
  ctx: CreateNextContextOptions,
  sessionCookie: string
) => {
  nookies.set(ctx, withPrefix("sessionCookie"), sessionCookie, cookieConfig);
};

export const destroySessionCookie = (ctx: CreateNextContextOptions) => {
  nookies.destroy(ctx, withPrefix("sessionCookie"), { path: "/" });
};

export const destroyAllDeprecatedCookies = (ctx: CreateNextContextOptions) => {
  nookies.destroy(ctx, withPrefix("name"), { path: "/" });
  nookies.destroy(ctx, withPrefix("id"), { path: "/" });
  nookies.destroy(ctx, withPrefix("password"), { path: "/" });
};
