import { useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useEffect, useState } from "react";
import { MyActionIcon } from "src/components/Shared/ActionIcon";

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <MyActionIcon onClick={() => toggleColorScheme()}>
      {!mounted || colorScheme === "light" ? <IconMoonStars /> : <IconSun />}
    </MyActionIcon>
  );
}
