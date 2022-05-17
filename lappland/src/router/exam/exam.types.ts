import { z } from "zod";

export const examMetaSchema = z.object({
  name: z.string(),
  number: z.string(),
  semester: z.string(),
  url: z.string().url(),
  year: z.string(),
  displayName: z.string(),
});
export type ExamMeta = z.infer<typeof examMetaSchema>;

export type ExamSubject = {
  name: string;
  score: string;
  average: string;
};

export type ExamDetail = {
  info: {
    grade: string;
    className: string;
    year: string;
    semester: string;
    name: string;
  };
  score: {
    sum: string;
    avg: string;
  };
  rank: {
    inClass: string;
    inSchool: string;
  };
  subjects: ExamSubject[];
};
