import got from "got";
import { decodeBig5 } from "src/handlers/decodeBig5";
import { API } from "../constants";
import { getTestMetaList } from "./getTestMetaList";

export const testMetaList = async (sessionCookie: string) => {
  try {
    const testListResult = await got.get(API.TEST_LIST, {
      headers: { cookie: sessionCookie },
    });

    const decodedTestListHtml = decodeBig5(testListResult.rawBody);
    const testMetaList = getTestMetaList(decodedTestListHtml);

    return testMetaList;
  } catch (e) {
    throw new Error("發生了尚未被分析的錯誤");
  }
};
