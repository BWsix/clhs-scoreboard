export const getVerificationToken = (content: string) => {
  const RequestVerificationToken = /VerificationToken" value="(\w+)"/g;
  const result = RequestVerificationToken.exec(content);

  return result![1];
};
