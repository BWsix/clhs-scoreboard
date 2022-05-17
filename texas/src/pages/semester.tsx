import { ExamSemester } from "src/components/Semester/Semester";
import { getPageLayout } from "src/layouts/PageLayout";

export default function SemesterPage() {
  return <ExamSemester />;
}
SemesterPage.getLayout = getPageLayout({
  title: "學期成績",
  onlyPageTitle: true,
});
