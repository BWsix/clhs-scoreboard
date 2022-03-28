import axios from "axios";
import { decodeBig5 } from "src/handlers/decodeBig5";
import { getTestDetail } from "./getTestDetail";

export const testDetail = async (sessionCookie: string, url: string) => {
  try {
    const testDetailResult = await axios.get(url, {
      headers: { cookie: sessionCookie },
      responseType: "arraybuffer",
    });

    const decodedTestDetailHtml = decodeBig5(
      Buffer.from(testDetailResult.data)
    );
    const testDetail = getTestDetail(decodedTestDetailHtml);

    return testDetail;
  } catch (e) {
    throw new Error("發生了尚未被分析的錯誤");
  }
};
