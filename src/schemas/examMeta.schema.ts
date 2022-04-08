import { z } from "zod";

export const examMeta = z.object({
  name: z.string(),
  number: z.string(),
  semester: z.string(),
  url: z.string().url(),
  year: z.string(),
  displayName: z.string().nullable(),
});

export type ExamMetaType = z.infer<typeof examMeta>;
