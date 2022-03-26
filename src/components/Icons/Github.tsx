import { ActionIcon } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

const github = "https://github.com/BWsix/clhs_scoreboard";

export function GithubIcon() {
  return (
    <ActionIcon
      size="lg"
      radius="md"
      variant="filled"
      component="a"
      href={github}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BrandGithub />
    </ActionIcon>
  );
}
