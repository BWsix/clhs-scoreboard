import { Text } from "@mantine/core";
import { useUsername } from "src/components/hooks";

export const Username = () => {
  const { userName } = useUsername();

  return <Text weight={500}>{userName}</Text>;
};
