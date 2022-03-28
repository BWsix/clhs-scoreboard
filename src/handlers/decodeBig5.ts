import { decode } from "iconv-lite";

export const decodeBig5 = (content: Buffer) => {
  const decoded = decode(content, "Big5");

  return decoded;
};
