import { Table } from "@mantine/core";
import React from "react";
import { RightArrow } from "src/components/Icons/RightArrow";
import { useNavigator } from "src/hooks/useNavigator";

interface Props {
  closeSide: () => void;
}

const Row: React.FC<{ onClick: () => void }> = ({
  children,
  onClick: _onClick,
}) => {
  return (
    <tr style={{ cursor: "pointer" }} onClick={_onClick}>
      <td>{children}</td>
      <td>
        <RightArrow />
      </td>
    </tr>
  );
};

export const MyNavbar_Items: React.FC<Props> = ({ closeSide }) => {
  const navigate = useNavigator();

  return (
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
      </tbody>
    </Table>
  );
};
