import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import axios from "axios";
import got from "got";
import { API } from "src/constants";
import { decode } from "src/utils/decode";
import { getTestDetail } from "src/utils/getTestDetail";
import { getTestMetaList } from "src/utils/getTestMetaList";
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
      let pageWithCookieResult,
        cookie,
        verificationToken,
        loginResult,
        expires,
        userName;

      try {
        pageWithCookieResult = await got.get(API.BASE);

        cookie = pageWithCookieResult.headers["set-cookie"]![0].split(";")[0];
        verificationToken = getVerificationToken(pageWithCookieResult.body);

        loginResult = await got.post(API.LOGIN, {
          headers: { cookie },
          form: {
            division: "senior",
            Loginid: input.id,
            LoginPwd: input.password,
            __RequestVerificationToken: verificationToken,
          },
        });

        expires = loginResult.headers.expires;

        if (!expires) {
          return { error: true, message: "錯誤的帳號或密碼" };
        }

        const MATCH_NAME = /<title>([\u4e00-\u9fa5]+)學生線上查詢<\/title>/g;
        userName = MATCH_NAME.exec(decode(loginResult.rawBody))![1];

        return { error: false, message: "成功登入", cookie, userName };
      } catch (error) {
        console.log({
          where: "api/trpc/session",
          error,
          cookie,
          verificationToken,
          loginResult,
          expires,
          userName,
        });

        return {
          error: true,
          message: "發生了預期之外的錯誤(也許再試一次會解決)",
        };
      }
    },
  })
  .query("testMetaList", {
    input: z.object({ session: z.string() }),
    async resolve({ input }) {
      let testListResult, decodedTestListHtml, testMetaList;

      try {
        testListResult = await got.get(API.TEST_LIST, {
          headers: { cookie: input.session },
        });
        decodedTestListHtml = decode(testListResult.rawBody);
        testMetaList = getTestMetaList(decodedTestListHtml);

        return { error: false, message: "", testMetaList };
      } catch (error) {
        console.log({
          where: "api/trpc/testMetaList",
          error,
          input,
        });

        return { error: true, message: "發生了預期之外的錯誤" };
      }
    },
  })
  .mutation("testDetail", {
    input: z.object({ session: z.string(), url: z.string() }),
    async resolve({ input }) {
      let testDetailResult, decodedTestDetailHtml, testDetail;

      try {
        testDetailResult = await axios.get(input.url, {
          headers: { cookie: input.session },
          responseType: "arraybuffer",
        });
        decodedTestDetailHtml = decode(Buffer.from(testDetailResult.data));
        testDetail = getTestDetail(decodedTestDetailHtml);

        return { error: false, message: "", testDetail };
      } catch (error) {
        console.log({
          where: "api/trpc/testDetail",
          error,
          input,
        });

        return { error: true, message: "發生了預期之外的錯誤" };
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
