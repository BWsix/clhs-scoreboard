import { AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { Test } from "src/utils/getTestList";
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
  const [test, setTest] = useState<Test | undefined>(undefined);
  const testList = trpc.useQuery(["testList", { session }]);

  useEffect(() => {
    if (!testList.data) return;

    if (testList.data.error) {
      console.log(testList.data.message);
      setError(testList.data.message);
      return;
    }

    setTest(testList.data.testList![0]);
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
          setTest={setTest}
          testList={testList.data?.testList}
        />
      }
      header={<MyHeader opened={opened} setOpened={setOpened} />}
    >
      <TestDetail test={test} />
    </AppShell>
  );
};
