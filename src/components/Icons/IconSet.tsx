import { Group } from "@mantine/core";
import { GithubIcon } from "./Github";
import { TutorialIcon } from "./Tutorial";

export function IconSet() {
  return (
    <Group position="center" spacing="xs">
      <TutorialIcon />
      <GithubIcon />
    </Group>
  );
}
