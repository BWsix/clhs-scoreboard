import axios from "axios";
import { decodeBig5 } from "../utils/decodeBig5";
import { isSessionExpired } from "../utils/isSessionExpired";
import { getExamDetail } from "./examDetail.getExamDetail";

export const examDetail = async (sessionCookie: string, url: string) => {
  const examDetailResult = await axios.get(url, {
    headers: { cookie: sessionCookie },
    responseType: "arraybuffer",
  });

  const decodedExamDetailHtml = decodeBig5(Buffer.from(examDetailResult.data));
  isSessionExpired(decodedExamDetailHtml);

  const examDetail = getExamDetail(decodedExamDetailHtml);

  return examDetail;
};