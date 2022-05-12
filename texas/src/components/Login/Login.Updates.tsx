import { Alert, Anchor, Image, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const InfoCard: React.FC<Props> = ({ children, title }) => {
  return (
    <Alert
      title={title}
      radius="md"
      icon={<IconAlertCircle size={16} />}
      variant="outline"
      mt="md"
    >
      {children}
    </Alert>
  );
};

export const Updates = () => {
  return (
    <>
      <Title order={3} align="center">
        💪力挺校方防疫政策，暫時關閉服務💪
      </Title>

      <InfoCard title="2022/5/12 暫時關閉服務">
        各位抱歉，突然關閉服務，因為我真的很怕會被學校請去喝茶。學校開放查詢後會立刻重啟服務！
      </InfoCard>

      <InfoCard title="2022/5/11 學校公告">
        <Image src="https://i.imgur.com/WZhmz5y.png" alt="耗子尾汁" />
      </InfoCard>

      <InfoCard title="2023/4/8 UI更新">
        請重新安裝壢中 Scoreboard 來確保&quot;回到上次離開畫面&quot;功能正常
        <br />
        <Anchor href="/installation" target="_blank">
          在新的分頁開啟壢中 Scoreboard
        </Anchor>
      </InfoCard>
    </>
  );
};
