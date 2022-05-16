import * as trpc from "@trpc/server";
import { authRouter } from "./auth/auth.router";
import { RouterContext } from "./context";
import { examRouter } from "./exam/exam.router";
import { newsRouter } from "./news/news.router";
import { timetableRouter } from "./timetable/timetable.router";

export const router = trpc
  .router<RouterContext>()

  //* Start unprotected routers
  .merge("auth.", authRouter)
  .merge(newsRouter)
  //* End unprotected routers

  .middleware(({ ctx, next }) => {
    if (!ctx.user.loggedIn) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    return next();
  })

  //* Start protected routers
  .merge("exam.", examRouter)
  .merge(timetableRouter);
//* End protected routers

export type RouterType = typeof router;
