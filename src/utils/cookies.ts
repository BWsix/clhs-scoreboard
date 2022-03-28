import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import nookies from "nookies";
import { login } from "src/handlers/login";

type CookieNames = "sessionCookie" | "name" | "id" | "password";

const withPrefix = (name: CookieNames) => "sb-" + name;
const isDevMode = process.env.NODE_ENV === "development";

export const getCookie = (ctx: CreateNextContextOptions, name: CookieNames) => {
  const cookies = nookies.get(ctx, { path: "/" });

  return cookies[withPrefix(name)];
};

export const setCookie = (
  ctx: CreateNextContextOptions,
  name: CookieNames,
  value: string,
  maxAge: number | null = 60 * 15 // 15 minutes
) => {
  const cookieConfig = {
    maxAge,
    path: "/",
    httpOnly: !isDevMode,
    secure: !isDevMode,
    sameSite: !isDevMode,
  };

  nookies.set(ctx, withPrefix(name), value, cookieConfig);
};

export const destroyAllCookies = (ctx: CreateNextContextOptions) => {
  nookies.destroy(ctx, withPrefix("sessionCookie"), { path: "/" });
  nookies.destroy(ctx, withPrefix("name"), { path: "/" });
  nookies.destroy(ctx, withPrefix("id"), { path: "/" });
  nookies.destroy(ctx, withPrefix("password"), { path: "/" });
};

export const getSessionCookie = async (ctx: CreateNextContextOptions) => {
  const sessionCookie = getCookie(ctx, "sessionCookie");
  if (sessionCookie) return sessionCookie;

  try {
    const id = getCookie(ctx, "id");
    const password = getCookie(ctx, "password");

    const data = await login(id, password);

    setCookie(ctx, "sessionCookie", data.sessionCookie);

    return data.sessionCookie;
  } catch {
    destroyAllCookies(ctx);

    throw new Error("sessionError");
  }
};
