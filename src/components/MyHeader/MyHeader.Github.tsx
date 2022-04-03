import { ActionIcon, useMantineTheme } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

const github = "https://github.com/BWsix/clhs_scoreboard";

export function GithubIcon() {
  const theme = useMantineTheme();

  return (
    <ActionIcon
      size="lg"
      radius="md"
      color={theme.primaryColor}
      component="a"
      href={github}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BrandGithub />
    </ActionIcon>
  );
}
