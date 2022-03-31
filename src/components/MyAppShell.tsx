import { AppShell, Navbar } from "@mantine/core";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TestMeta } from "src/handlers/testMetaList/getTestMetaList";
import { useLogout } from "src/hooks/useLogout";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { MyHeader } from "./MyHeader";
import { ErrorFallback } from "./Shared/ErrorFallback";
import { TestDetail } from "./TestDetail";
import { TestList } from "./TestList";

export const MyAppShell: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const toggleLogout = useLogout();
  const [testMeta, setTestMeta] = useState<TestMeta | undefined>(undefined);

  const testMetaListQuery = trpc.useQuery(["testMetaList"], {
    onSuccess: (testMetaList) => {
      event({ action: "testListQuery", category: "system" });

      if (!testMetaList.length) {
        return;
      }

      setTestMeta(testMetaList[0]);
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        return toggleLogout();
      }
    },
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            px="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 300, lg: 400 }}
          >
            <TestList
              error={testMetaListQuery.error?.message || ""}
              setTestMeta={setTestMeta}
              testMetaList={testMetaListQuery.data}
            />
          </Navbar>
        }
        header={<MyHeader opened={opened} setOpened={setOpened} />}
      >
        <TestDetail testMeta={testMeta} />
      </AppShell>
    </ErrorBoundary>
  );
};
