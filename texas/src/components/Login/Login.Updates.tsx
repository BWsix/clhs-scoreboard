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
