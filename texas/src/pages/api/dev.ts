import { NextApiHandler } from "next";
import { greet } from "@clhs-scoreboard/lappland";

const handler: NextApiHandler = (req, res) => {
  const result = greet(req.query.name as string);

  res.end(result);
};

export default handler;
