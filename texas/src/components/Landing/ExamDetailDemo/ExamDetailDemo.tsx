import { detail } from "@clhs-scoreboard/lappland/lib/mocks";
import { Divider } from "@mantine/core";
import { Meta } from "src/components/Exams/ExamDetail/ExamDetail.Meta";
import { ExamDetailTable } from "src/components/Exams/ExamDetail/ExamDetail.Table";
import { Section } from "../Shared/Section";
import { SectionTitle } from "../Shared/SectionTitle";

const data =
  detail[
    "https://eschool.clhs.tyc.edu.tw/online/selection_student/student_subjects_number.asp?action=%A6U%A6%A1%A6%A8%C1Z&thisyear=109&thisterm=1&number=0012&exam%5Fname=%B2%C41%A6%B8%B4%C1%A4%A4%A6%D2"
  ];

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
