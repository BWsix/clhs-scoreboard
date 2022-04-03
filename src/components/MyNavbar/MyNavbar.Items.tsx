import { ActionIcon, Box, Divider, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useLastTab, useNavigator } from "src/components/hooks";
import {
  Book,
  CalendarEvent,
  ChevronDown,
  ChevronUp,
  Help,
  List,
  Speakerphone,
} from "tabler-icons-react";
import { ItemRow } from "./MyNavbar.Items.Row";
import { MyNavbar_TestList } from "./MyNavbar.TestList";

interface Props {
  closeSide: () => void;
}

export const MyNavbar_Items: React.FC<Props> = ({ closeSide }) => {
  const navigate = useNavigator();
  const { lastTab, setLastTab } = useLastTab();
  const [lastTabIsTestDetail, setLastTabIsTestDetail] = useState(
    lastTab === "testDetail"
  );

  const arrowDown = !lastTabIsTestDetail;

  return (
    <>
      <ItemRow
        Icon={Book}
        onClick={() => {
          closeSide();
          navigate({ tab: "schedule", data: null });
        }}
      >
        <Text>課表</Text>
      </ItemRow>

      <ItemRow
        Icon={Speakerphone}
        onClick={() => {
          closeSide();
          navigate({ tab: "news", data: null });
        }}
      >
        <Text>官網公告</Text>
      </ItemRow>

      <ItemRow
        Icon={CalendarEvent}
        onClick={() => {
          closeSide();
          navigate({ tab: "calendar", data: null });
        }}
      >
        <Text>行事曆</Text>
      </ItemRow>

      <ItemRow
        Icon={Help}
        onClick={() => {
          closeSide();
          navigate({ tab: "installationGuide", data: null });
        }}
      >
        <Text>安裝教學</Text>
      </ItemRow>

      <ItemRow
        Icon={List}
        onClick={() => {
          setLastTabIsTestDetail((o) => !o);
          setLastTab("testDetail");
        }}
      >
        <Group position="apart" sx={{ flex: 1 }}>
          <Text>考試清單</Text>

          <ActionIcon variant="transparent">
            {arrowDown ? <ChevronDown /> : <ChevronUp />}
          </ActionIcon>
        </Group>
      </ItemRow>

      {lastTabIsTestDetail && (
        <Box>
          <Divider my="sm" label="考試清單" />

          <MyNavbar_TestList closeSide={closeSide} />
        </Box>
      )}
    </>
  );
};
