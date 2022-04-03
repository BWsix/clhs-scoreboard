import got from "got";
import { API } from "src/handlers/constants";
import { decodeBig5, isSessionExpired } from "src/handlers/utils";
import { getTestMetaList } from "./testMetaList.getTestMetaList";

export const testMetaList = async (sessionCookie: string) => {
  const testListResult = await got.get(API.TEST_LIST, {
    headers: { cookie: sessionCookie },
  });

  const decodedTestListHtml = decodeBig5(testListResult.rawBody);
  isSessionExpired(decodedTestListHtml);

  const testMetaList = getTestMetaList(decodedTestListHtml);

  return testMetaList;
};
