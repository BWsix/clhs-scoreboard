import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import got from "got";
import { API } from "src/constants";
import { decode } from "src/utils/decode";
import { getTestList } from "src/utils/getTestList";
import { getVerificationToken } from "src/utils/getVerificationToken";
import { z } from "zod";

const appRouter = trpc
  .router()
  .mutation("session", {
    input: z.object({
      id: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      try {
        const data = await got.get(API.BASE);

        const cookie = data.headers["set-cookie"]![0].split(";")[0];
        const verificationToken = getVerificationToken(data.body);

        const loginResult = await got.post(API.LOGIN, {
          headers: { cookie },
          form: {
            division: "senior",
            Loginid: input.id,
            LoginPwd: input.password,
            __RequestVerificationToken: verificationToken,
          },
        });

        const expires = loginResult.headers.expires;

        if (!expires) {
          return { error: true, message: "錯誤的帳號或密碼" };
        }

        console.log("hey");

        return { error: false, message: "成功登入", cookie };
      } catch (e) {
        return {
          error: true,
          message: "發生了預期之外的錯誤(也許再試一次會解決)",
        };
      }
    },
  })
  .query("testList", {
    input: z.object({ session: z.string() }),
    async resolve({ input }) {
      try {
        const testListResult = await got.get(API.TEST_LIST, {
          headers: { cookie: input.session },
        });

        const decodedTestListHtml = decode(testListResult.rawBody);
        const testList = getTestList(decodedTestListHtml);

        return { error: false, message: "", testList };
      } catch (e) {
        console.log(e);

        return { error: true, message: "發生了預期之外的錯誤" };
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
