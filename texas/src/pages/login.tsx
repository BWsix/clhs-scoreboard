import { Alert, Anchor, Container, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { LoginPageForm } from "src/components/Login/Login";
import { getPageLayout } from "src/layouts/PageLayout";

const INFO_LIST: InfoProps[] = [
  {
    title: "2022/05/20 悲報",
    children: (
      <>
        學校今天更新伺服器，現在用不了了，只能等校方開放查詢後看看能不能用，謝謝大家😢。
      </>
    ),
  },
];

export default function LoginPage() {
  const isCurrentVersion =
    typeof window !== "undefined" &&
    window?.location?.origin === "https://clhs-scoreboard.vercel.app";

  const infoList = INFO_LIST.map(({ children, title }, idx) => (
    <InfoCard title={title} key={idx}>
      {children}
    </InfoCard>
  ));

  return (
    <Container size="xs">
      {!isCurrentVersion && (
        <Alert color="red" mb="sm">
          你正在使用的這個網站並不是正式版，請使用以下網站以確保你的網站內容得到持續更新：
          <Anchor href="http://clhs-scoreboard.vercel.app">
            http://clhs-scoreboard.vercel.app
          </Anchor>
        </Alert>
      )}
      {infoList}
    </Container>
  );
}
LoginPage.getLayout = getPageLayout({ title: "登入", onlyPageTitle: true });

interface InfoProps {
  title?: string;
  children?: React.ReactNode;
}

const InfoCard: React.FC<InfoProps> = ({ children, title }) => {
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
