import { Accordion, AccordionItem, Image, Text } from "@mantine/core";
import React from "react";
import { CopyURL } from "src/components/Shared/CopyUrl";
import { getPageLayout } from "src/layouts/PageLayout";
interface DeviceType {
  name: string;
  steps: {
    text: string;
    image?: string;
    startWithCopyUrlButton?: boolean;
  }[];
}

const data: DeviceType[] = [
  {
    name: "Android",
    steps: [
      {
        startWithCopyUrlButton: true,
        text: "後用Chrome打開，點選畫面右上方的選單",
        image: "https://i.imgur.com/5ksgtax.png",
      },
      {
        text: "選單大約中間位置會有一個「安裝應用程式」的按鈕",
        image: "https://i.imgur.com/EDnbWTl.png",
      },
    ],
  },
  {
    name: "iPhone",
    steps: [
      {
        startWithCopyUrlButton: true,
        text: "後用safari打開，點選畫面底部中間的分享按鈕來開啟選單",
      },
      {
        text: "選單大約中間位置會有一個「加入主畫面」的按鈕",
        image: "https://i.imgur.com/FyMcYg1.jpg",
      },
    ],
  },
  {
    name: "iPad",
    steps: [
      {
        startWithCopyUrlButton: true,
        text: "後用safari打開，點選畫面右上方的分享按鈕來開啟選單",
      },
      {
        text: "選單大約中間位置會有一個「加入主畫面」的按鈕",
        image: "https://i.imgur.com/FyMcYg1.jpg",
      },
    ],
  },
  {
    name: "PC",
    steps: [
      {
        text: "網址列右方的「安裝」圖示",
        image: "https://i.imgur.com/iicTAqa.png",
      },
    ],
  },
];

export default function InstallationPage() {
  const accordionItems = data.map((device, idx) => {
    const steps = device.steps.map(
      ({ text, image, startWithCopyUrlButton }, idx) => (
        <div key={idx}>
          <Text pb="sm">
            {idx + 1}. {startWithCopyUrlButton && <CopyURL />}
            {text}
          </Text>
          {image && <Image radius="md" pb="sm" src={image} alt={text} />}
        </div>
      )
    );

    return (
      <AccordionItem key={idx} label={device.name}>
        {steps}
      </AccordionItem>
    );
  });

  return <Accordion iconPosition="right">{accordionItems}</Accordion>;
}
InstallationPage.getLayout = getPageLayout({ title: "安裝教學" });
