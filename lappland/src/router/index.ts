import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "./context";
import { router, RouterType } from "./router";

export type { RouterType };
export const nextApiHandler = trpcNext.createNextApiHandler({
  router,
  createContext,
});
