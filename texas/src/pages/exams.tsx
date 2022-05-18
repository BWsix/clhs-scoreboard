import { Exams } from "src/components/Exams/Exams";
import { getPageLayout } from "src/layouts/PageLayout";

export default function ExamsPage() {
  return <Exams />;
}
ExamsPage.getLayout = getPageLayout({ title: "成績查詢", onlyPageTitle: true });
