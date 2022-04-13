export const getVerificationToken = (pageResultBody: string) => {
  const matchToken = /VerificationToken" value="(\w+)"/g;
  const result = matchToken.exec(pageResultBody);

  if (!result) {
    throw new Error("發生了不太可能發生的錯誤");
  }

  return result[1];
};
