import got from "got";
import { API } from "../constants";
import { decodeBig5 } from "../utils/decodeBig5";
import { isSessionExpired } from "../utils/isSessionExpired";
import { getExamMetaList } from "./examMetaList.getExamMetaList";

export const examMetaList = async (sessionCookie: string) => {
  const examListResult = await got.get(API.TEST_LIST, {
    headers: { cookie: sessionCookie },
  });

  const decodedExamListHtml = decodeBig5(examListResult.rawBody);
  isSessionExpired(decodedExamListHtml);

  const examMetaList = getExamMetaList(decodedExamListHtml);

  return examMetaList;
};
