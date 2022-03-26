import { AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { TestMeta } from "src/utils/getTestMetaList";
import { trpc } from "src/utils/trpc";
import { MyHeader } from "./MyHeader";
import { TestDetail } from "./TestDetail";
import { TestList } from "./TestList";

interface Props {
  session: string;
}

export const MyAppShell: React.FC<Props> = ({ session, children }) => {
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);
  const [testMeta, setTestMeta] = useState<TestMeta | undefined>(undefined);
  const testList = trpc.useQuery(["testMetaList", { session }]);

  useEffect(() => {
    if (!testList.data) return;

    if (testList.data.error) {
      setError(testList.data.message);
      return;
    }

    setTestMeta(testList.data.testList![0]);
  }, [testList.data]);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <TestList
          error={error}
          opened={opened}
          setOpened={setOpened}
          setTest={setTestMeta}
          testList={testList.data?.testList}
        />
      }
      header={<MyHeader opened={opened} setOpened={setOpened} />}
    >
      <TestDetail session={session} testMeta={testMeta} />
    </AppShell>
  );
};
