import { Accordion } from "@mantine/core";
import { AppShellContainerTitle } from "src/components/AppShell/AppShell.Title";
import { Android } from "./Platforms/Android";
import { IPad } from "./Platforms/IPad";
import { IPhone } from "./Platforms/IPhone";
import { PC } from "./Platforms/PC";

export const Installation = () => {
  return (
    <>
      <AppShellContainerTitle title="安裝教學" />

      <Accordion iconPosition="right">
        <Accordion.Item label="Android">
          <Android />
        </Accordion.Item>

        <Accordion.Item label="iPhone">
          <IPhone />
        </Accordion.Item>

        <Accordion.Item label="iPad">
          <IPad />
        </Accordion.Item>

        <Accordion.Item label="電腦">
          <PC />
        </Accordion.Item>
      </Accordion>
    </>
  );
};
