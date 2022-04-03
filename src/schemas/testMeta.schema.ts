import { z } from "zod";

export const testMeta = z.object({
  name: z.string(),
  number: z.string(),
  semester: z.string(),
  url: z.string().url(),
  year: z.string(),
});

export type TestMetaType = z.infer<typeof testMeta>;
