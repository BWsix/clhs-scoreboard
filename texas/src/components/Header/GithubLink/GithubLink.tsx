import { IconBrandGithub } from "@tabler/icons";
import { MyActionIcon } from "src/components/Shared/ActionIcon";

const url = "https://github.com/BWsix/clhs_scoreboard";

export function GithubLink() {
  return (
    <MyActionIcon onClick={() => window.open(url, "_blank")}>
      <IconBrandGithub />
    </MyActionIcon>
  );
}
