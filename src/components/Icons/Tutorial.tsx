import {
  Accordion,
  ActionIcon,
  Image,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { QuestionMark } from "tabler-icons-react";

const IMAGES = {
  pc: "https://i.imgur.com/iicTAqa.png",
  ios: "https://i.imgur.com/XwULSH1.jpg",
  android: "https://i.imgur.com/7u3ZRU8.png",
};

function InstallationGuide() {
  return (
    <Accordion iconPosition="right" multiple>
      <Accordion.Item label="Android">
        <Text pb="sm">使用Chrome開啟後便會在畫面下方跳出安裝按鈕</Text>
        <Image radius="md" src={IMAGES.android} alt="installation(ios)" />
      </Accordion.Item>

      <Accordion.Item label="iPhone和iPad">
        <Text pb="sm">
          將網址複製下來用safari打開，按中間的分享後再按新增至主畫面
        </Text>
        <Image radius="md" src={IMAGES.ios} alt="installation(ios)" />
      </Accordion.Item>

      <Accordion.Item label="電腦">
        <Text pb="sm">按一下網址列右上方的「安裝」圖示後即可安裝</Text>
        <Image radius="md" src={IMAGES.pc} alt="installation(PC)" />
      </Accordion.Item>
    </Accordion>
  );
}

export function TutorialIcon() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="CLHS Scoreboard"
      >
        <Title order={4} align="center">
          如何安裝
        </Title>
        <InstallationGuide />
      </Modal>

      <ActionIcon
        size="lg"
        radius="md"
        variant="filled"
        onClick={() => {
          setOpened(true);
        }}
      >
        <QuestionMark />
      </ActionIcon>
    </>
  );
}
