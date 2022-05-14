import { newsListQuery } from "@clhs-api/core";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { RouterContext } from "../context";

export const newsRouter = trpc.router<RouterContext>().query("news", {
  input: z.object({
    cursor: z.number().nullish(),
  }),
  async resolve({ input }) {
    const page = input.cursor || 0;

    const result = await newsListQuery({ page });

    return { newsList: result.newsList, nextCursor: page + 1 };
  },
});
