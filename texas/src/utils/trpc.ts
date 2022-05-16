// utils/trpc.ts
import type { RouterType } from "@clhs-scoreboard/lappland/lib";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<RouterType>();
// => { useQuery: ..., useMutation: ...}
