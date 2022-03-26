import {
  ActionIcon,
  Button,
  Divider,
  Loader,
  Navbar,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { Credentials } from "src/pages/login";
import { TestMeta } from "src/utils/getTestMetaList";
import { ChevronRight } from "tabler-icons-react";

interface Props {
  error: string;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setTest: Dispatch<SetStateAction<TestMeta | undefined>>;
  testList?: TestMeta[];
}

export const TestList: React.FC<Props> = ({
  error,
  opened,
  setOpened,
  setTest,
  testList,
}) => {
  const router = useRouter();
  const [cred, setCred] = useLocalStorage<Credentials | undefined>({
    key: "cred",
  });

  if (error) return <>{error}</>;

  const rows = testList?.map((test) => (
    <tr
      key={test.year + test.semester + test.name}
      onClick={() => {
        setOpened(false);
        setTest(test);
      }}
    >
      <td>{test.year}</td>
      <td>{test.semester}</td>
      <td>{test.name}</td>
      <td>
        <ActionIcon my="auto" variant="hover">
          <ChevronRight />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <Navbar
      px="sm"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 300, lg: 400 }}
    >
      <Navbar.Section
        m="sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text my="auto">{cred?.userName}</Text>
        <Button
          px="xl"
          color="gray"
          onClick={() => {
            setCred(undefined);

            router.push("/login");
          }}
        >
          登出
        </Button>
      </Navbar.Section>

      <Divider />

      {testList ? (
        <Navbar.Section grow component={ScrollArea} offsetScrollbars pt="sm">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>學年</th>
                <th>學期</th>
                <th>考試</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Navbar.Section>
      ) : (
        <Loader mx="auto" />
      )}
    </Navbar>
  );
};
