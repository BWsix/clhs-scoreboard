import got from "got";
import { decodeBig5 } from "src/handlers/decodeBig5";
import { API } from "../constants";
import { isSessionExpired } from "../isSessionExpired";
import { getTestMetaList } from "./getTestMetaList";

export const testMetaList = async (sessionCookie: string) => {
  const testListResult = await got.get(API.TEST_LIST, {
    headers: { cookie: sessionCookie },
  });

  const decodedTestListHtml = decodeBig5(testListResult.rawBody);
  isSessionExpired(decodedTestListHtml);

  const testMetaList = getTestMetaList(decodedTestListHtml);

  return testMetaList;
};
