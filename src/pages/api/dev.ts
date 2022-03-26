import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import * as iconv from "iconv-lite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await got.get(
    `https://eschool.clhs.tyc.edu.tw/online/selection_student/grade_chart_single.asp?SubjectNo=1201&SubjectName=${iconv.decode(
      Buffer.from("%u570B%u8A9E%u6587"),
      "big5"
    )}`,
    { headers: { cookie: "ASPSESSIONIDQWDQRTCT=IHCLDKBDGMODJIIANNBFBBLP" } }
  );

  console.log(result);

  res.json(result.body);
}
