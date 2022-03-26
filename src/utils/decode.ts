import * as iconv from "iconv-lite";

export const decode = (content: Buffer) => {
  const decoded = iconv.decode(content, "Big5");

  return decoded;
};
