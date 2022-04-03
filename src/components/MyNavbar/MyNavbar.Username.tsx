import { Text } from "@mantine/core";
import { useUsername } from "src/components/hooks";

export const Username = () => {
  const { userName } = useUsername();

  const hour = new Date().getHours();
  let greet = "哈囉";

  if (hour >= 6 && hour < 12) {
    greet = "早安";
  } else if (hour >= 12 && hour < 18) {
    greet = "午安";
  } else if (hour >= 18 && hour < 24) {
    greet = "晚安";
  }

  return (
    <Text weight={500}>
      {greet}, {userName}
    </Text>
  );
};
