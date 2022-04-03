import { Accordion } from "@mantine/core";
import { AppShellContainerTitle } from "src/components/Others/AppShellContainerTitle";
import { Android } from "./InstallationGuide.Android";
import { IPad } from "./InstallationGuide.IPad";
import { IPhone } from "./InstallationGuide.IPhone";
import { PC } from "./InstallationGuide.PC";

export const InstallationGuide = () => {
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
