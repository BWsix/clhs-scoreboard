import { useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { MyActionIcon } from "src/components/Shared/ActionIcon";

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MyActionIcon onClick={() => toggleColorScheme()}>
      {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
    </MyActionIcon>
  );
}
