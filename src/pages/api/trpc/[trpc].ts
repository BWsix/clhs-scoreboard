import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { login } from "src/handlers/login";
import { getSchedule } from "src/handlers/schedule";
import { testDetail } from "src/handlers/testDetail";
import { testMetaList } from "src/handlers/testMetaList";
import {
  destroyAllDeprecatedCookies,
  destroySessionCookie,
  getSessionCookie,
  setSessionCookie,
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
      destroyAllDeprecatedCookies(ctx);

      const { name, sessionCookie } = await login(input.id, input.password);
      setSessionCookie(ctx, sessionCookie);

      return { name };
    },
  })
  .mutation("logout", {
    resolve: ({ ctx }) => {
      destroyAllDeprecatedCookies(ctx);

      destroySessionCookie(ctx);
    },
  })
  .middleware(async ({ ctx, next }) => {
    const sessionCookie = getSessionCookie(ctx);

    if (!sessionCookie) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Session expired, please re-login.",
      });
    }

    return next({ ctx: { ...ctx, sessionCookie } });
  })
  .mutation("me", {
    resolve: () => {
      return true;
    },
  })
  .query("schedule", {
    async resolve({ ctx }) {
      const data = await getSchedule(ctx.sessionCookie);

      return data;
    },
  })
  .query("testMetaList", {
    async resolve({ ctx }) {
      const data = await testMetaList(ctx.sessionCookie);

      return data;
    },
  })
  .query("testDetail", {
    input: z.object({ url: z.string() }),
    async resolve({ input, ctx }) {
      const data = await testDetail(ctx.sessionCookie, input.url);

      return data;
    },
  });

export type AppRouter = typeof router;

export default trpcNext.createNextApiHandler({ router, createContext });
