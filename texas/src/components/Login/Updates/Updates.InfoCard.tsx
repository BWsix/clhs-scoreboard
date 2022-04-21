import { Alert, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<Props> = ({ children, title }) => {
  return (
    <Alert
      title={title}
      radius="md"
      icon={<IconAlertCircle size={16} />}
      variant="outline"
      mt="md"
    >
      <Text>{children}</Text>
    </Alert>
  );
};
