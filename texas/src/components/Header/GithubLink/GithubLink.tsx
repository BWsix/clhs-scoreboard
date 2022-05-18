import { IconBrandGithub } from "@tabler/icons";
import { MyActionIcon } from "src/components/Shared/ActionIcon";

const url = "https://github.com/BWsix/clhs-scoreboard";

export function GithubLink() {
  return (
    <MyActionIcon href={url}>
      <IconBrandGithub />
    </MyActionIcon>
  );
}
