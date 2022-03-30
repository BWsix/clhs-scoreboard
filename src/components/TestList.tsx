import {
  ActionIcon,
  Divider,
  Loader,
  Navbar,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { TestMeta } from "src/handlers/testMetaList/getTestMetaList";
import { useUsername } from "src/hooks/useUserName";
import { ChevronRight } from "tabler-icons-react";
import { LogoutButton } from "./Buttons/LogoutButton";

interface Props {
  error: string;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setTestMeta: Dispatch<SetStateAction<TestMeta | undefined>>;
  testMetaList?: TestMeta[];
}

export const TestList: React.FC<Props> = ({
  error,
  opened,
  setOpened,
  setTestMeta,
  testMetaList,
}) => {
  const { userName } = useUsername();

  if (error) {
    return (
      <Text color="red" align="center" mt="md">
        {error}
      </Text>
    );
  }

  const head = (
    <tr>
      <th>學年</th>
      <th>學期</th>
      <th>考試</th>
      <th></th>
    </tr>
  );

  const rows = testMetaList?.map((testMeta) => (
    <tr
      key={testMeta.year + testMeta.semester + testMeta.name}
      onClick={() => {
        setOpened(false);
        setTestMeta(testMeta);
      }}
    >
      <td>{testMeta.year}</td>
      <td>{testMeta.semester}</td>
      <td>{testMeta.name}</td>
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
        <Text my="auto">{userName}</Text>
        <LogoutButton />
      </Navbar.Section>

      <Divider />

      {testMetaList ? (
        <Navbar.Section grow component={ScrollArea} offsetScrollbars pt="sm">
          <Table highlightOnHover>
            <thead>{head}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </Navbar.Section>
      ) : (
        <Loader mx="auto" />
      )}
    </Navbar>
  );
};
