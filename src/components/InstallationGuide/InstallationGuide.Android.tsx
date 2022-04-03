import { Divider, Image, Text } from "@mantine/core";
import { CopyURL } from "./InstallationGuide.CopyUrl";

export function Android() {
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
