import {
  Button,
  Divider,
  Loader,
  Navbar,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { Credentials } from "src/pages/login";
import { TestMeta } from "src/utils/getTestMetaList";

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

  return (
    <Navbar
      px="sm"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 300, lg: 400 }}
    >
      {testList ? (
        <Navbar.Section grow component={ScrollArea} offsetScrollbars pt="sm">
          <SimpleGrid cols={1} spacing="sm">
            {testList.map((test) => (
              <Button
                key={test.fullName}
                variant="subtle"
                color="gray"
                onClick={() => {
                  setTest(test);

                  if (opened) {
                    setOpened(false);
                  }
                }}
              >
                <Text align="center">{test.fullName}</Text>
              </Button>
            ))}
          </SimpleGrid>
        </Navbar.Section>
      ) : (
        <Loader mx="auto" />
      )}

      <Divider />

      <Navbar.Section
        m="sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text>{cred?.userName}</Text>
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
    </Navbar>
  );
};
