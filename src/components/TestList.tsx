import {
  Button,
  Divider,
  Loader,
  Navbar,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { Test } from "src/utils/getTestList";

interface Props {
  error: string;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setTest: Dispatch<SetStateAction<Test | undefined>>;
  testList?: Test[];
}

export const TestList: React.FC<Props> = ({
  error,
  opened,
  setOpened,
  setTest,
  testList,
}) => {
  if (error) return <>error</>;

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 300, lg: 400 }}
    >
      <Title align="center" order={4} pb="sm">
        考試列表
      </Title>

      <Divider py="sm" />

      {testList ? (
        <SimpleGrid cols={1} spacing="sm">
          {testList.map((test) => (
            <Button
              key={test.fullName}
              variant="outline"
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
      ) : (
        <Loader mx="auto" />
      )}
    </Navbar>
  );
};
