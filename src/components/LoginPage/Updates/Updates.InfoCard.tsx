import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";

interface Props {
  title?: string;
}

export const InfoCard: React.FC<Props> = ({ children, title }) => {
  return (
    <Alert
      title={title}
      radius="md"
      icon={<AlertCircle size={16} />}
      variant="outline"
      mt="md"
    >
      {children}
    </Alert>
  );
};
