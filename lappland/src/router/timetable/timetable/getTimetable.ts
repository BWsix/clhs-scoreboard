import got from "got";
import { decodeBig5 } from "../../../utils/decodeBig5";
import { parseTimetable } from "./parseTimetable";

export const getTimetable = async (sessionCookie: string) => {
  const API =
    "https://eschool.clhs.tyc.edu.tw/online/student/school_class_tabletime.asp";

  const getResult = await got.get(API, {
    headers: { cookie: sessionCookie },
  });
  const decodedBody = decodeBig5(getResult.rawBody);
  const data = parseTimetable(decodedBody);

  return data;
};
