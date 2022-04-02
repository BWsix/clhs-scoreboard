import { Alert } from "@mantine/core";
import React from "react";
import { AlertCircle } from "tabler-icons-react";

interface Props {
  title?: string;
}

export const LoginInfoCard: React.FC<Props> = ({ children, title }) => {
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
