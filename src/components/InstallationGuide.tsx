import {
  Accordion,
  Anchor,
  Divider,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { useClickOutside, useClipboard, useDisclosure } from "@mantine/hooks";
import { AppShellContainerTitle } from "src/components/Others/AppShellContainerTitle";

function CopyURL() {
  const clipboard = useClipboard();
  const [opened, handlers] = useDisclosure(false);
  const ref = useClickOutside(() => handlers.close());

  const url = "https://CLHS-Scoreboard.vercel.app";

  return (
    <Tooltip
      opened={opened}
      label="已複製到剪貼簿！"
      radius="md"
      withArrow
      ref={ref}
    >
      <Anchor
        onClick={() => {
          clipboard.copy(url);
          handlers.open();
        }}
      >
        複製網址
      </Anchor>
    </Tooltip>
  );
}

function Android() {
  const urls = {
    directPrompt: "https://i.imgur.com/1uS8lcr.png",
    menuIcon: "https://i.imgur.com/5ksgtax.png",
    installationButton: "https://i.imgur.com/EDnbWTl.png",
  };

  return (
    <>
      <Text pb="sm">
        1. <CopyURL />
        後用Chrome打開，畫面下方便會跳出安裝按鈕
      </Text>
      <Image radius="md" src={urls.directPrompt} alt="directPrompt" />

      <Divider py="sm" label="或是" labelPosition="center" />

      <Text pb="sm">
        2-1. <CopyURL /> 後用Chrome打開，點選畫面右上方的選單
      </Text>
      <Image radius="md" src={urls.menuIcon} alt="menuIcon" />

      <Text pb="sm">2-2. 選單大約中間位置會有一個「安裝應用程式」的按鈕</Text>
      <Image
        radius="md"
        src={urls.installationButton}
        alt="installationButton"
      />
    </>
  );
}

function IPhone() {
  const urls = {
    installationButton: "https://i.imgur.com/FyMcYg1.jpg",
  };

  return (
    <>
      <Text pb="sm">
        1. <CopyURL />
        後用safari打開，點選畫面底部中間的分享按鈕來開啟選單
      </Text>

      <Text pb="sm">2. 選單大約中間位置會有一個「加入主畫面」的按鈕</Text>
      <Image
        radius="md"
        src={urls.installationButton}
        alt="installationButton"
      />
    </>
  );
}

function IPad() {
  const urls = {
    installationButton: "https://i.imgur.com/FyMcYg1.jpg",
  };

  return (
    <>
      <Text pb="sm">
        1. <CopyURL />
        後用safari打開，點選畫面右上方的分享按鈕來開啟選單
      </Text>

      <Text pb="sm">2. 選單大約中間位置會有一個「加入主畫面」的按鈕</Text>
      <Image
        radius="md"
        src={urls.installationButton}
        alt="installationButton"
      />
    </>
  );
}

function PC() {
  const urls = {
    installationButton: "https://i.imgur.com/iicTAqa.png",
  };

  return (
    <>
      <Text pb="sm">網址列右方的「安裝」圖示</Text>
      <Image
        radius="md"
        src={urls.installationButton}
        alt="installationButton"
      />
    </>
  );
}

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
