import axios from "axios";
import { decodeBig5 } from "src/handlers/decodeBig5";
import { isSessionExpired } from "../isSessionExpired";
import { getTestDetail } from "./getTestDetail";

export const testDetail = async (sessionCookie: string, url: string) => {
  const testDetailResult = await axios.get(url, {
    headers: { cookie: sessionCookie },
    responseType: "arraybuffer",
  });

  const decodedTestDetailHtml = decodeBig5(Buffer.from(testDetailResult.data));
  isSessionExpired(decodedTestDetailHtml);

  const testDetail = getTestDetail(decodedTestDetailHtml);

  return testDetail;
};
