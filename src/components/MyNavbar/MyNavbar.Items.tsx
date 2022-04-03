import { Navbar, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { useLastTab, useNavigator } from "src/components/hooks";
import { RightArrow } from "./MyNavbar.RightArrow";
import { MyNavbar_TestList } from "./MyNavbar.TestList";

interface Props {
  closeSide: () => void;
}

const Row: React.FC<{ onClick: () => void; opened?: boolean }> = ({
  children,
  onClick: _onClick,
  opened,
}) => {
  return (
    <tr style={{ cursor: "pointer" }} onClick={_onClick}>
      <td>{children}</td>
      <td>
        <RightArrow down={opened} />
      </td>
    </tr>
  );
};

export const MyNavbar_Items: React.FC<Props> = ({ closeSide }) => {
  const navigate = useNavigator();
  const { lastTab, setLastTab } = useLastTab();
  const [opened, setOpened] = useState(lastTab === "testDetail");

  return (
    <>
      <Navbar.Section>
        <Table highlightOnHover>
          <tbody>
            <Row
              onClick={() => {
                closeSide();

                navigate({ tab: "schedule", data: null });
              }}
            >
              課表
            </Row>
            <Row
              onClick={() => {
                closeSide();

                navigate({ tab: "news", data: null });
              }}
            >
              官網公告
            </Row>
            <Row
              onClick={() => {
                closeSide();

                navigate({ tab: "calendar", data: null });
              }}
            >
              行事曆
            </Row>
            <Row
              onClick={() => {
                closeSide();

                navigate({ tab: "installationGuide", data: null });
              }}
            >
              安裝教學
            </Row>
            <Row
              opened={opened}
              onClick={() => {
                setOpened((o) => !o);
                setLastTab("testDetail");
              }}
            >
              考試清單
            </Row>
          </tbody>
        </Table>
      </Navbar.Section>

      {!!opened && (
        <Navbar.Section grow component={ScrollArea}>
          <MyNavbar_TestList closeSide={closeSide} />
        </Navbar.Section>
      )}
    </>
  );
};
