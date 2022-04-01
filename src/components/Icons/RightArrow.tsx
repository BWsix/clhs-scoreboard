import { ActionIcon } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

export const RightArrow = () => {
  return (
    <ActionIcon
      variant="transparent"
      style={{ width: "100%", display: "flex", justifyContent: "right" }}
    >
      <ChevronRight />
    </ActionIcon>
  );
};
