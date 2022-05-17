import { Timetable } from "src/components/Timebable/Timetable";
import { getPageLayout } from "src/layouts/PageLayout";

export default function TimetablePage() {
  return <Timetable />;
}
TimetablePage.getLayout = getPageLayout({ title: "課表" });
