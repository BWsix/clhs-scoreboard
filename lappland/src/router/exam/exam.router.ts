import * as trpc from "@trpc/server";
import { z } from "zod";
import * as mockExam from "../../mocks/exam";
import { RouterContext } from "../context";
import { getDetail } from "./detail/getDetail";
import { getMeta } from "./meta/getMeta";
import { getSemester } from "./semester/setSemester";

export const examRouter = trpc
  .router<RouterContext>()
  .query("semester", {
    input: z.object({ grade: z.number() }),
    resolve({ ctx, input }) {
      if (ctx.user.guest) {
        return mockExam.semester[input.grade];
      }

      return getSemester(ctx.user.sessionCookie, input.grade);
    },
  })
  .query("meta", {
    async resolve({ ctx }) {
      if (ctx.user.guest) {
        return mockExam.meta;
      }

      return getMeta(ctx.user.sessionCookie);
    },
  })
  .query("detail", {
    input: z.object({ url: z.string() }),
    async resolve({ input, ctx }) {
      if (ctx.user.guest) {
        return (mockExam.detail as any)[input.url];
      }

      return getDetail(ctx.user.sessionCookie, input.url);
    },
  });
