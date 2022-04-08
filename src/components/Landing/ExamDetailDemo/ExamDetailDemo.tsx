import { Divider } from "@mantine/core";
import { Meta } from "src/components/Exams/ExamDetail/ExamDetail.Meta";
import { ExamDetailTable } from "src/components/Exams/ExamDetail/ExamDetail.Table";
import { ExamDetail } from "src/handlers/examDetail/examDetail.getExamDetail";
import { Section } from "../Shared/Section";
import { SectionTitle } from "../Shared/SectionTitle";

const data: ExamDetail = {
  info: { className: "", grade: "", name: "", semester: "", year: "" },
  rank: { inClass: "", inSchool: "" },
  score: { avg: "72.56", sum: "1306" },
  subjects: [
    {
      name: "國語文",
      score: "65",
      average: "75.02",
    },
    {
      name: "英語文",
      score: "94",
      average: "77.5",
    },
    {
      name: "數學",
      score: "65",
      average: "70.69",
    },
    {
      name: "選修物理-力學二與熱學",
      score: "66",
      average: "64.21",
    },
    {
      name: "選修化學-物質構造與反應速率",
      score: "86",
      average: "87.33",
    },
    {
      name: "選修生物-動物體的構造與功能",
      score: "53",
      average: "70.02",
    },
  ],
};

export const ExamDetailDemo = () => {
  return (
    <Section>
      <SectionTitle title="範例 - 成績查詢" />
      <Meta data={data} />

      <Divider size="sm" my="lg" />
      <ExamDetailTable data={data} />
    </Section>
  );
};
