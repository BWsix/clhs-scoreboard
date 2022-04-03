import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLastTab } from "src/components/hooks";
import { InstallationGuide } from "src/components/InstallationGuide";
import { MyHeader } from "src/components/MyHeader";
import { MyNavbar } from "src/components/MyNavbar";
import { News } from "src/components/News";
import { AppShellContainer } from "src/components/Others/AppShellContainer";
import { Schedule } from "src/components/Schedule";
import { ErrorFallback } from "src/components/Shared";
import { TestDetail } from "src/components/TestDetail";
import * as schemas from "src/schemas";
import type { TestMetaType } from "src/schemas/testMeta.schema";

export type TabProps =
  | { tab: "testDetail"; data: TestMetaType }
  | { tab: "installationGuide"; data: null }
  | { tab: "schedule"; data: null }
  | { tab: "news"; data: null };

export const MyAppShell: React.FC = () => {
  const router = useRouter();
  const [sideOpened, sideHandler] = useDisclosure(false);
  const { lastTab } = useLastTab();
  const [tabData, setTabData] = useState<TabProps>({
    tab: lastTab,
    data: {} as any,
  });

  useEffect(() => {
    const tab = String(router.query.tab) as TabProps["tab"];

    switch (tab) {
      case "testDetail": {
        const parsedTestMeta = schemas.testMeta.safeParse(router.query);
        if (parsedTestMeta.success)
          setTabData({ tab: "testDetail", data: parsedTestMeta.data });
        break;
      }
      case "schedule": {
        setTabData({ tab: "schedule", data: null });
        break;
      }
      case "news": {
        setTabData({ tab: "news", data: null });
        break;
      }
      case "installationGuide": {
        setTabData({ tab: "installationGuide", data: null });
        break;
      }
      default: {
        break;
      }
    }
  }, [router.query]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <MyNavbar sideOpened={sideOpened} closeSide={sideHandler.close} />
        }
        header={
          <MyHeader opened={sideOpened} toggleSide={sideHandler.toggle} />
        }
      >
        <AppShellContainer>
          {tabData.tab === "testDetail" ? (
            <TestDetail testMeta={tabData.data} />
          ) : tabData.tab === "installationGuide" ? (
            <InstallationGuide />
          ) : tabData.tab === "schedule" ? (
            <Schedule />
          ) : tabData.tab === "news" ? (
            <News />
          ) : (
            <></>
          )}
        </AppShellContainer>
      </AppShell>
    </ErrorBoundary>
  );
};
