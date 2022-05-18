import { Alert, Container, Text, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import Link from "next/link";
import { LoginPageForm } from "src/components/Login/Login";
import { getPageLayout } from "src/layouts/PageLayout";

const INFO_LIST: InfoProps[] = [];

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
          你正在使用網頁的不是正式版，請使用以下網站以確保你的網站內容得到持續更新：
          <Link href="http://clhs-scoreboard.vercel.app">
            <Text sx={{ textDecoration: "underline" }}>
              http://clhs-scoreboard.vercel.app
            </Text>
          </Link>
        </Alert>
      )}
      <LoginPageForm />
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
