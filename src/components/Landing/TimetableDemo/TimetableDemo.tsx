import { TimetableTable } from "src/components/Timebable/Timetable.table";
import { timeTable } from "src/mocks";
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
