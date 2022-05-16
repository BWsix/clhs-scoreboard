import got from "got";
import { decodeBig5 } from "../../../utils/decodeBig5";
import { metaParser } from "./metaParser";

export const getMeta = async (sessionCookie: string) => {
  const API =
    "https://eschool.clhs.tyc.edu.tw/online/selection_student/student_subjects_number.asp?action=open_window_frame";

  const getResult = await got.get(API, {
    headers: { cookie: sessionCookie },
  });
  const decodedBody = decodeBig5(getResult.rawBody);
  const data = metaParser(decodedBody);

  return data;
};
