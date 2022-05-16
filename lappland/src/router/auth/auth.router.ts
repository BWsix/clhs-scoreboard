import * as trpc from "@trpc/server";
import { z } from "zod";
import * as cookie from "../../utils/cookie";
import { RouterContext } from "../context";
import { getAccessToken } from "./login/getAccessToken";
import { getRefreshToken } from "./login/getRefreshToken";

export const authRouter = trpc
  .router<RouterContext>()
  .mutation("login", {
    input: z.object({
      id: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      if (input.id === "" && input.password === "") {
        cookie.set(ctx, "accessToken", "guest");
        return { name: "訪客模式" };
      }

      console.log("before getRefreshToken:", Date.now());
      const refreshToken = await getRefreshToken(input.id, input.password);
      cookie.set(ctx, "refreshToken", refreshToken);
      console.log("after getRefreshToken:", Date.now());

      console.log("before getAccessToken:", Date.now());
      const accessToken = await getAccessToken(refreshToken);
      cookie.set(ctx, "accessToken", accessToken);
      console.log("after getAccessToken:", Date.now());

      return { name: "姓名，晚點再修" };
    },
  })
  .mutation("logout", {
    resolve: ({ ctx }) => {
      if (!ctx.user.loggedIn) {
        return;
      }

      cookie.destroyAll(ctx);
    },
  });
