import * as trpc from "@trpc/server";
import { timeTable } from "../../mocks/timeTable";
import { RouterContext } from "../context";
import { getTimetable } from "./timetable/getTimetable";

export const timetableRouter = trpc.router<RouterContext>().query("timetable", {
  resolve({ ctx }) {
    if (ctx.user.guest) {
      return timeTable;
    }

    return getTimetable(ctx.user.sessionCookie);
  },
});
