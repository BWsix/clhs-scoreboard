import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { login } from "src/handlers/login";
import { testDetail } from "src/handlers/testDetail";
import { testMetaList } from "src/handlers/testMetaList";
import {
  destroyAllCookies,
  getCookie,
  getSessionCookie,
  setCookie,
} from "src/utils/cookies";
import { z } from "zod";

export function createContext(opts?: trpcNext.CreateNextContextOptions) {
  if (!opts) {
    throw new Error("Cannot resolve your request!");
  }

  return opts;
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

const router = trpc
  .router<Context>()
  .mutation("login", {
    input: z.object({
      id: z.string(),
      password: z.string(),
    }),
    async resolve({ input, ctx }) {
      const data = await login(input.id, input.password);

      const TEN_DAYS = 60 * 60 * 24 * 10;

      setCookie(ctx, "sessionCookie", data.sessionCookie);
      setCookie(ctx, "name", data.name, null); // will last forever since I really don't wanna change the frontend code.
      setCookie(ctx, "id", input.id, TEN_DAYS);
      setCookie(ctx, "password", input.password, TEN_DAYS);

      return data;
    },
  })
  .query("me", {
    async resolve({ ctx }) {
      const name = getCookie(ctx, "name");

      return name;
    },
  })
  .mutation("logout", {
    async resolve({ ctx }) {
      destroyAllCookies(ctx);

      return { foo: "bar" };
    },
  })
  .mutation("refresh", {
    async resolve({ ctx }) {
      await getSessionCookie(ctx);

      return { foo: "bar" };
    },
  })
  .query("testMetaList", {
    async resolve({ ctx }) {
      const sessionCookie = await getSessionCookie(ctx);

      const data = await testMetaList(sessionCookie);

      return data;
    },
  })
  .mutation("testDetail", {
    input: z.object({ url: z.string() }),
    async resolve({ input, ctx }) {
      const sessionCookie = await getSessionCookie(ctx);

      const data = await testDetail(sessionCookie, input.url);

      return data;
    },
  });

export type AppRouter = typeof router;

export default trpcNext.createNextApiHandler({ router, createContext });
