const RequestVerificationToken =
  /name="__RequestVerificationToken" value="(\w+)"/g;

export const getVerificationToken = (content: string) => {
  const result = RequestVerificationToken.exec(content);

  return result![1];
};
