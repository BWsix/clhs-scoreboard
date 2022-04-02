import { newsListQuery } from "@clhs-api/core";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const newsRouter = trpc.router().query("news", {
  input: z.object({
    cursor: z.number().nullish(),
  }),
  async resolve({ input: { cursor } }) {
    const page = cursor || 0;

    const result = await newsListQuery({ page });

    return { newsList: result.newsList, nextCursor: page + 1 };
  },
});
