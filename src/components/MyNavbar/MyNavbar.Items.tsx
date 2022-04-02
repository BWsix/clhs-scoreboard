import { Navbar, ScrollArea, Table } from "@mantine/core";
import React, { useState } from "react";
import { RightArrow } from "src/components/Icons/RightArrow";
import { useLastTab } from "src/hooks/uselastTab";
import { useNavigator } from "src/hooks/useNavigator";
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
  const { lastTab } = useLastTab();
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

                navigate({ tab: "installationGuide", data: null });
              }}
            >
              安裝教學
            </Row>
            <Row
              opened={opened}
              onClick={() => {
                setOpened((o) => !o);
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
