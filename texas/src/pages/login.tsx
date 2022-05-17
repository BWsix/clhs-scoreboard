import { Alert, Container } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { LoginPageForm } from "src/components/Login/Login";
import { getPageLayout } from "src/layouts/PageLayout";

const INFO_LIST: InfoProps[] = [];

export default function LoginPage() {
  const infoList = INFO_LIST.map(({ children, title }, idx) => (
    <InfoCard title={title} key={idx}>
      {children}
    </InfoCard>
  ));

  return (
    <Container size="xs">
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
