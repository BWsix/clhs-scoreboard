import { News } from "src/components/News/News";
import { getPageLayout } from "src/layouts/PageLayout";

export default function NewsPage() {
  return <News />;
}
NewsPage.getLayout = getPageLayout({ title: "官網公告", onlyPageTitle: true });
