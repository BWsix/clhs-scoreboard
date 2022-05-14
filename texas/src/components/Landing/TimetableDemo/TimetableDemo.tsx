import { timeTable } from "@clhs-scoreboard/lappland/lib/mocks";
import { TimetableTable } from "src/components/Timebable/Timetable.table";
import { Section } from "../Shared/Section";
import { SectionTitle } from "../Shared/SectionTitle";

export const TimetableDemo = () => {
  return (
    <Section>
      <SectionTitle title="範例 - 課表查詢" />

      <TimetableTable data={timeTable} />
    </Section>
  );
};
