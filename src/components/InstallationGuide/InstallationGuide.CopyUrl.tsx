import { Tooltip } from "@mantine/core";
import { useClickOutside, useClipboard, useDisclosure } from "@mantine/hooks";
import { Anchor } from "tabler-icons-react";

const URL = "https://CLHS-Scoreboard.vercel.app";

export function CopyURL() {
  const clipboard = useClipboard();
  const [opened, handlers] = useDisclosure(false);
  const ref = useClickOutside(() => handlers.close());

  return (
    <Tooltip
      opened={opened}
      label="已複製到剪貼簿！"
      radius="md"
      withArrow
      ref={ref}
    >
      <Anchor
        onClick={() => {
          clipboard.copy(URL);
          handlers.open();
        }}
      >
        複製網址
      </Anchor>
    </Tooltip>
  );
}
