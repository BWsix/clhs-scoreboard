import { Text } from "@mantine/core";
import { useEffect } from "react";
import { usePreviousPage } from "src/components/hooks/usePreviousPage";
import { getPageLayout } from "src/layouts/PageLayout";

export default function GoToPrev() {
  const { goToPrev } = usePreviousPage();

  useEffect(() => {
    goToPrev();
  }, []);

  return <Text align="center">Redirecting...</Text>;
}
GoToPrev.getLayout = getPageLayout({
  title: "Redirecting...",
  onlyPageTitle: true,
});
