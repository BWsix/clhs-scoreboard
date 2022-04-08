import { newsListQuery } from "@clhs-api/core";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import * as handlers from "src/handlers";
import * as cookie from "src/handlers/libs/cookie";
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
      cookie.destroyAllDeprecatedCookies(ctx);

      const { name, sessionCookie } = await handlers.login(
        input.id,
        input.password
      );
      cookie.setSessionCookie(ctx, sessionCookie);

      return { name };
    },
  })
  .mutation("logout", {
    resolve: ({ ctx }) => {
      cookie.destroyAllDeprecatedCookies(ctx);

      cookie.destroySessionCookie(ctx);
    },
  })
  .query("news", {
    input: z.object({
      cursor: z.number().nullish(),
    }),
    async resolve({ input: { cursor } }) {
      const page = cursor || 0;

      const result = await newsListQuery({ page });

      return { newsList: result.newsList, nextCursor: page + 1 };
    },
  })
  .middleware(({ ctx, next }) => {
    const sessionCookie = cookie.getSessionCookie(ctx);

    return next({ ctx: { ...ctx, sessionCookie } });
  })

  .query("schedule", {
    async resolve({ ctx }) {
      const data = await handlers.getSchedule(ctx.sessionCookie);

      return data;
    },
  })
  .query("examMetaList", {
    async resolve({ ctx }) {
      const data = await handlers.examMetaList(ctx.sessionCookie);

      return data;
    },
  })
  .query("examDetail", {
    input: z.object({ url: z.string() }),
    async resolve({ input, ctx }) {
      const data = await handlers.examDetail(ctx.sessionCookie, input.url);

      return data;
    },
  });

export type AppRouter = typeof router;

export default trpcNext.createNextApiHandler({ router, createContext });
