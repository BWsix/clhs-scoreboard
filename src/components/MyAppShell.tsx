import { AppShell } from "@mantine/core";
import { useState } from "react";
import { TestMeta } from "src/handlers/testMetaList/getTestMetaList";
import { useLogout } from "src/hooks/useLogout";
import { trpc } from "src/utils/trpc";
import { MyHeader } from "./MyHeader";
import { TestDetail } from "./TestDetail";
import { TestList } from "./TestList";

export const MyAppShell: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const toggleLogout = useLogout();
  const [error, setError] = useState("");
  const [testMeta, setTestMeta] = useState<TestMeta | undefined>(undefined);

  const testMetaListQuery = trpc.useQuery(["testMetaList"], {
    onSuccess: (testMetaList) => {
      if (!testMetaList.length) {
        setError("沒有考試紀錄");
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
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <TestList
          error={testMetaListQuery.error?.message || error || ""}
          opened={opened}
          setOpened={setOpened}
          setTestMeta={setTestMeta}
          testMetaList={testMetaListQuery.data}
        />
      }
      header={<MyHeader opened={opened} setOpened={setOpened} />}
    >
      <TestDetail testMeta={testMeta} />
    </AppShell>
  );
};
