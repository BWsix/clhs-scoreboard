import { Image, Text } from "@mantine/core";

export function PC() {
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
