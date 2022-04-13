import { Image, Text } from "@mantine/core";
import { CopyURL } from "../CopyUrl/CopyUrl";

export function IPhone() {
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
