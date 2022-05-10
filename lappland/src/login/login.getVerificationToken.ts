import got from "got";

const API = "https://eschool.clhs.tyc.edu.tw/auth/Auth/Login";

export const getVerificationToken = async () => {
  const getResult = await got.get(API);
  const validationCookie = getResult.headers["set-cookie"]![0].split(";")[0];
  const matchToken = /type="hidden" value="([\-\d\w]+)"/g;
  const requestVerificationToken = matchToken.exec(getResult.body)![1];

  if (!validationCookie || !requestVerificationToken) {
    throw new Error("發生了不太可能發生的錯誤");
  }

  return { validationCookie, requestVerificationToken };
};
