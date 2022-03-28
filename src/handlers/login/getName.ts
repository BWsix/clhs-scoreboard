import { decodeBig5 } from "../decodeBig5";

export const getName = (loginResultRawBody: Buffer) => {
  const matchName = /<title>([\u4e00-\u9fa5]+)學生線上查詢<\/title>/g;

  const decodedBody = decodeBig5(loginResultRawBody);
  const matchedName = matchName.exec(decodedBody);

  const name = matchedName ? matchedName[1] : "(error)";

  return name;
};
