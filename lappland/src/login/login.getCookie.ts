import type { Response } from "got";

export const getCookie = (pageResult: Response<string>) => {
  const cookie = pageResult.headers["set-cookie"]![0].split(";")[0];

  return cookie;
};
