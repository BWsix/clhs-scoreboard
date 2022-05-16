import axios from "axios";
import { decodeBig5 } from "../../../utils/decodeBig5";
import { detailParser } from "./detailParser";

export const getDetail = async (sessionCookie: string, url: string) => {
  const getResult = await axios.get(url, {
    headers: { cookie: sessionCookie },
    responseType: "arraybuffer",
  });

  const decodedBody = decodeBig5(Buffer.from(getResult.data));
  const data = detailParser(decodedBody);

  return data;
};
